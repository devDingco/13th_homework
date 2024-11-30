"use client";

import { useParams } from "next/navigation";
import DetailContents from "./DetailContents";
import DetailHeader from "./DetailHeader";
import { useQuery } from "@apollo/client";
import { FETCH_SOLPLACE_LOG } from "@/common/apis/graphql/queries/fetch-solplace-log.query";

export default function DetailContainer() {
  const params = useParams();
  const id = params.solplaceLogId;
  const { data } = useQuery(FETCH_SOLPLACE_LOG, {
    variables: { id },
  });

  return (
    <div className="pt-24 px-20">
      <DetailHeader data={data} />
      <DetailContents data={data} />
    </div>
  );
}
