import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

import { Video } from "@/components/Video";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 px-10 py-10">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-8 text-4xl font-bold text-white">
          Explore AI Videos
        </h1>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Cinematic Portrait"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_034505_9389c8eb-ce22-45df-8755-addfb794552f_wm3.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Dynamic Action"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3Btsg1RieQ0oYK6o6x65C3UYqNH/hf_20260814_013039_5cf05b01-4ce4-4c9e-8af5-1b9122611c9b_wm3.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Fashion Editorial"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3FRnqOjr7P4vUmrsWyEzZbKAqVU/77406d67-d5db-4b1d-81e2-9e0139b39249_hs_wm.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Dreamy Lifestyle"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_2urnL94WJ71YKcCUCm8E5tfhGy9/437a80c2-3e11-4650-8777-c06e7ca567c5_hs_wm.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Urban Cinematic"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_2ur1GVspfLsY1DdntDHndMzei3U/450ecdcf-021e-48ce-a1a5-848799d2df56_hs_wm.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Creative Commercial"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_2urRVI1bCfxGUsP28tBUphocCbh/507bc86d-a335-48fb-8732-06695a749350_hs_wm.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Luxury Product"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3FRnqOjr7P4vUmrsWyEzZbKAqVU/77406d67-d5db-4b1d-81e2-9e0139b39249_hs_wm.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Epic Adventure"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_2ur1GVspfLsY1DdntDHndMzei3U/450ecdcf-021e-48ce-a1a5-848799d2df56_hs_wm.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Cinematic Travel"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_2ur1GVspfLsY1DdntDHndMzei3U/450ecdcf-021e-48ce-a1a5-848799d2df56_hs_wm.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Surreal World"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3CN3NlActPxxUfaXfH903u7EnPq/468db48f-512d-4ca0-b475-8011acc1e8eb_hs_wm.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Dream Sequence"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_041544_b5f84d9d-a9db-472c-9ece-fed23857b096_wm3.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Character Story"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_041459_e02ab22b-6d8e-46bd-874e-8090a8f00799_wm3.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="AI Cinema"
                url="https://cdn.higgsfield.ai/card/747ea491-90c4-435b-9742-b8abdabcl58a.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Viral Advertisement"
                url="https://cdn.higgsfield.ai/viral_hub/99017935-54a8-4d3a-9fd6-445710265fac.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Product Showcase"
                url="https://cdn.higgsfield.ai/viral_hub_preset/d1b7d148-46a1-4e57-b808-4af2e8c823f1.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Visual Storytelling"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_035550_51b6328c-1648-411a-917a-1d8cecb d166c_wm3.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Cinematic Motion"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_002238_83054aec-92b9-4efe-b015-6c33e4bd7ba3_wm3.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Creative Character"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3FRnqOjr7P4vUmrsWyEzZbKAqVU/77406d67-d5db-4b1d-81e2-9e0139b39249_hs_wm.mp4"
              />
            </CarouselItem>

            <CarouselItem className="basis-1/3 pl-4">
              <Video
                title="Fantasy Scene"
                url="https://d8j0ntlcm91z4.cloudfront.net/user_3HrUZEqvogBOowmw1C0BIb3oNDN/hf_20260814_040632_12ff4cdd-bba8-4a6d-bff5-312d4a2cbb23_wm3.mp4"
              />
            </CarouselItem>

          </CarouselContent>

          <CarouselPrevious className="left-2 h-10 w-10 bg-white text-black shadow-lg hover:bg-gray-200" />

          <CarouselNext className="right-2 h-10 w-10 bg-white text-black shadow-lg hover:bg-gray-200" />

        </Carousel>

      </div>
    </div>
  );
}