import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, Hydrate } from "@tanstack/react-query";
import { getPhotos } from "./page";
import { use } from "react";
import PhotosComponent from "../../components/Photos";

export default function HydratedPosts() {
  const queryClient = getQueryClient();
  use(queryClient.prefetchQuery(["posts"], getPhotos));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <PhotosComponent />
    </Hydrate>
  );
}
