import { GraphQLError } from "graphql";
import { adminDb, adminAuth, adminStorage } from "@/lib/firebase/admin";

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new GraphQLError("Not authenticated");

      const userDoc = await adminDb.collection("users").doc(user.uid).get();

      return {
        id: userDoc.id,
        ...userDoc.data(),
      };
    },

    diary: async (_, { id }, { user }) => {
      if (!user) throw new GraphQLError("Not authenticated");

      const diaryDoc = await adminDb.collection("diaries").doc(id).get();

      if (!diaryDoc.exists) {
        throw new GraphQLError("Diary not found");
      }

      const diaryData = diaryDoc.data()!;

      if (diaryData.userId !== user.uid && !diaryData.isPublic) {
        throw new GraphQLError("Not authorized");
      }

      return {
        id: diaryDoc.id,
        ...diaryData,
      };
    },

    diaries: async (_, { cursor, limit, isPublic }, { user }) => {
      if (!user) throw new GraphQLError("Not authenticated");

      let query = adminDb
        .collection("diaries")
        .where("userId", "==", user.uid)
        .orderBy("createdAt", "desc");

      if (typeof isPublic === "boolean") {
        query = query.where("isPublic", "==", isPublic);
      }

      if (cursor) {
        const cursorDoc = await adminDb.collection("diaries").doc(cursor).get();
        query = query.startAfter(cursorDoc);
      }

      const diariesSnapshot = await query.limit(limit + 1).get();

      const hasNextPage = diariesSnapshot.size > limit;
      const edges = diariesSnapshot.docs.slice(0, limit).map((doc) => ({
        node: {
          id: doc.id,
          ...doc.data(),
        },
        cursor: doc.id,
      }));

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: edges[edges.length - 1]?.cursor,
        },
      };
    },

    monthlyEmotionStats: async (_, { year, month }, { user }) => {
      if (!user) throw new GraphQLError("Not authenticated");

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);

      const diariesSnapshot = await adminDb
        .collection("diaries")
        .where("userId", "==", user.uid)
        .where("createdAt", ">=", startDate)
        .where("createdAt", "<=", endDate)
        .get();

      const emotions = diariesSnapshot.docs.map((doc) => doc.data().emotion);
      const emotionCounts = emotions.reduce((acc, emotion) => {
        acc[emotion] = (acc[emotion] || 0) + 1;
        return acc;
      }, {});

      const total = emotions.length;

      return Object.entries(emotionCounts).map(([emotion, count]) => ({
        emotion,
        count,
        percentage: (count / total) * 100,
      }));
    },
  },

  Mutation: {
    signup: async (_, { email, password, name }) => {
      try {
        const userRecord = await adminAuth.createUser({
          email,
          password,
          displayName: name,
        });

        // Firestore에 사용자 추가 정보 저장
        await adminDb.collection("users").doc(userRecord.uid).set({
          email,
          name,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const token = await adminAuth.createCustomToken(userRecord.uid);

        return {
          token,
          user: {
            id: userRecord.uid,
            email,
            name,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        };
      } catch (error) {
        throw new GraphQLError("Error creating user");
      }
    },

    createDiary: async (
      _,
      { emotion, content, isPublic, images },
      { user }
    ) => {
      if (!user) throw new GraphQLError("Not authenticated");

      try {
        const diaryRef = adminDb.collection("diaries").doc();
        const now = new Date();

        const diaryData = {
          userId: user.uid,
          emotion,
          content,
          isPublic,
          images: images || [],
          createdAt: now,
          updatedAt: now,
        };

        await diaryRef.set(diaryData);

        return {
          id: diaryRef.id,
          ...diaryData,
        };
      } catch (error) {
        throw new GraphQLError("Error creating diary");
      }
    },

    uploadImage: async (_, { file }, { user }) => {
      if (!user) throw new GraphQLError("Not authenticated");

      try {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();

        const bucket = adminStorage.bucket();
        const filepath = `uploads/${user.uid}/${Date.now()}-${filename}`;
        const fileRef = bucket.file(filepath);

        await new Promise((resolve, reject) => {
          stream
            .pipe(fileRef.createWriteStream())
            .on("finish", resolve)
            .on("error", reject);
        });

        const [url] = await fileRef.getSignedUrl({
          action: "read",
          expires: "01-01-2500",
        });

        return url;
      } catch (error) {
        throw new GraphQLError("Error uploading file");
      }
    },
  },

  Diary: {
    user: async (parent) => {
      const userDoc = await adminDb
        .collection("users")
        .doc(parent.userId)
        .get();

      return {
        id: userDoc.id,
        ...userDoc.data(),
      };
    },

    comments: async (parent) => {
      const commentsSnapshot = await adminDb
        .collection("comments")
        .where("diaryId", "==", parent.id)
        .orderBy("createdAt", "desc")
        .get();

      return commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  },
};

export default resolvers;
