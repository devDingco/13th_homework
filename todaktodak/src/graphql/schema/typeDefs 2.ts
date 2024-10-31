const typeDefs = `
  scalar DateTime
  scalar Upload

  type User {
    id: ID!
    email: String!
    name: String!
    profileImage: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Diary {
    id: ID!
    userId: ID!
    user: User!
    emotion: String!
    content: String!
    images: [String!]
    isPublic: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    comments: [Comment!]
    aiAnalysis: AIAnalysis
  }

  type Comment {
    id: ID!
    diaryId: ID!
    userId: ID!
    user: User!
    content: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AIAnalysis {
    emotionSummary: String!
    triggers: [String!]!
    suggestions: [String!]!
  }

  type EmotionStats {
    emotion: String!
    count: Int!
    percentage: Float!
  }

  type Therapist {
    id: ID!
    userId: ID!
    name: String!
    profileImage: String!
    introduction: String!
    specialties: [String!]!
    location: Location!
    reviews: [Review!]
    rating: Float!
    reviewCount: Int!
  }

  type Location {
    address: String!
    latitude: Float!
    longitude: Float!
  }

  type Review {
    id: ID!
    therapistId: ID!
    userId: ID!
    rating: Int!
    content: String!
    receiptImage: String
    createdAt: DateTime!
    user: User!
  }

  type Query {
    me: User
    diary(id: ID!): Diary
    diaries(
      cursor: ID
      limit: Int = 10
      isPublic: Boolean
    ): DiaryConnection!
    monthlyEmotionStats(
      year: Int!
      month: Int!
    ): [EmotionStats!]!
    therapist(id: ID!): Therapist
    therapists(
      cursor: ID
      limit: Int = 10
      specialty: String
    ): TherapistConnection!
    therapistReviews(
      therapistId: ID!
      cursor: ID
      limit: Int = 10
    ): ReviewConnection!
  }

  type Mutation {
    # 인증
    signup(email: String!, password: String!, name: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean!
    
    # 일기
    createDiary(
      emotion: String!
      content: String!
      isPublic: Boolean!
      images: [String!]
    ): Diary!
    
    updateDiary(
      id: ID!
      emotion: String
      content: String
      isPublic: Boolean
      images: [String!]
    ): Diary!
    
    deleteDiary(id: ID!): Boolean!
    
    # 댓글
    createComment(
      diaryId: ID!
      content: String!
    ): Comment!
    
    updateComment(
      id: ID!
      content: String!
    ): Comment!
    
    deleteComment(id: ID!): Boolean!
    
    # 리뷰
    createReview(
      therapistId: ID!
      rating: Int!
      content: String!
      receiptImage: String
    ): Review!
    
    # 파일 업로드
    uploadImage(file: Upload!): String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type DiaryConnection {
    edges: [DiaryEdge!]!
    pageInfo: PageInfo!
  }

  type DiaryEdge {
    node: Diary!
    cursor: ID!
  }

  type TherapistConnection {
    edges: [TherapistEdge!]!
    pageInfo: PageInfo!
  }

  type TherapistEdge {
    node: Therapist!
    cursor: ID!
  }

  type ReviewConnection {
    edges: [ReviewEdge!]!
    pageInfo: PageInfo!
  }

  type ReviewEdge {
    node: Review!
    cursor: ID!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: ID
  }
`;

export default typeDefs;
