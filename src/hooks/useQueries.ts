import { useQuery } from "@tanstack/react-query";
import type {
  Category,
  VideoData,
  Promotion,
  Brand,
  AwardsData,
  Service,
  SkillsData,
  Creator,
  SocialLink,
  FeaturedVideo,
  YTVideo,
  SeoData,
} from "@/types";

const fetchJson = <T>(url: string): Promise<T> =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Failed to fetch ${url}`);
    return r.json() as Promise<T>;
  });

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchJson<Category[]>("/data/categories.json"),
  });

export const useVideos = () =>
  useQuery({
    queryKey: ["videos"],
    queryFn: () => fetchJson<VideoData>("/data/videos.json"),
  });

export const useVideoMeta = () =>
  useQuery({
    queryKey: ["video-meta"],
    queryFn: () =>
      fetchJson<
        Record<string, Pick<YTVideo, "title" | "description" | "thumbnail">>
      >("/data/video-meta.json").catch(
        () =>
          ({}) as Record<
            string,
            Pick<YTVideo, "title" | "description" | "thumbnail">
          >,
      ),
  });

export const usePromotions = () =>
  useQuery({
    queryKey: ["promotions"],
    queryFn: () => fetchJson<Promotion[]>("/data/promotions.json"),
  });

export const useBrands = () =>
  useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchJson<Brand[]>("/data/brands.json"),
  });

export const useAwards = () =>
  useQuery({
    queryKey: ["awards"],
    queryFn: () => fetchJson<AwardsData>("/data/awards.json"),
  });

export const useServices = () =>
  useQuery({
    queryKey: ["services"],
    queryFn: () => fetchJson<Service[]>("/data/services.json"),
  });

export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: () => fetchJson<SkillsData>("/data/skills.json"),
  });

export const useCreators = () =>
  useQuery({
    queryKey: ["creators"],
    queryFn: () => fetchJson<Creator[]>("/data/creators.json"),
  });

export const useSocialLinks = () =>
  useQuery({
    queryKey: ["social-links"],
    queryFn: () => fetchJson<SocialLink[]>("/data/social-links.json"),
  });

export const useFeatured = () =>
  useQuery({
    queryKey: ["featured"],
    queryFn: () => fetchJson<FeaturedVideo[]>("/data/featured.json"),
  });

export const useSeo = () =>
  useQuery({
    queryKey: ["seo"],
    queryFn: () => fetchJson<SeoData>("/data/seo.json"),
  });

export const useFestivalVideos = () =>
  useQuery({
    queryKey: ["festival"],
    queryFn: () =>
      fetchJson<YTVideo[]>("/data/namashkar-kolkata-festival.json"),
  });

export const usePhotoWalkVideos = () =>
  useQuery({
    queryKey: ["photowalk-videos"],
    queryFn: () =>
      fetchJson<YTVideo[]>("/data/namashkar-kolkata-photowalk.json"),
  });

export const usePhotowalk = () =>
  useQuery({
    queryKey: ["photowalk"],
    queryFn: () => fetchJson<{ photos: string[] }>("/data/photowalk.json"),
  });
