import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type Avatar = {
  id: string;
  name: string;
  image?: string;
};

async function createAvatar({
  url,
  name,
}: {
  url: string;
  name: string;
}) {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/avatar`,
    {
      name,
      image: url,
    }
  );

  return response.data;
}

async function getAvatars(): Promise<Avatar[]> {
  const response = await axios.get<{ avatars: Avatar[] }>(
    `${BACKEND_URL}/api/v1/avatars`
  );

  return response.data.avatars;
}

export function Dashboard() {
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["avatars"],
    queryFn: getAvatars,
  });

  const mutation = useMutation({
    mutationFn: createAvatar,

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["avatars"],
      });
    },
  });

  const handleCreateAvatar = async () => {
    if (!name.trim() || !avatarUrl.trim()) {
      return;
    }

    try {
      await mutation.mutateAsync({
        name,
        url: avatarUrl,
      });

      setName("");
      setAvatarUrl("");
    } catch (error) {
      console.error("Failed to create avatar:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7faf7] text-[#172018]">

      {/* Navbar */}
      <nav className="h-16 border-b border-[#e3e9e3] bg-white px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#dcefdc] flex items-center justify-center">
            <span className="font-bold text-[#3d7043]">H</span>
          </div>

          <span className="text-lg font-semibold">
            Higssy
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            className="text-[#405044] hover:bg-[#f0f5f0]"
          >
            Sign in
          </Button>

          <Button className="bg-[#d9efd9] text-[#315d37] border border-[#c5dfc5] hover:bg-[#cbe6cb]">
            Sign up
          </Button>

          <div className="h-9 w-9 rounded-full bg-[#dcefdc] text-[#3d7043] flex items-center justify-center font-medium">
            D
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-8 py-10">

        {/* Heading */}
        <section className="mb-10">
          <p className="text-sm font-medium text-[#64806a] mb-2">
            DASHBOARD
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Your avatars
          </h1>

          <p className="mt-2 text-[#748078]">
            Create and manage your avatars in one place.
          </p>
        </section>

        {/* Create Avatar */}
        <section className="bg-white border border-[#e0e7e0] rounded-2xl p-6 mb-10">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Create avatar
            </h2>

            <p className="text-sm text-[#7a857c] mt-1">
              Add a name and a reference image.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_1.5fr_auto] gap-4 items-end">

            <div>
              <label className="block mb-2 text-sm font-medium text-[#526057]">
                Name
              </label>

              <Input
                placeholder="e.g. Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-lg border-[#dce4dc] bg-white"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-[#526057]">
                Image URL
              </label>

              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="h-11 rounded-lg border-[#dce4dc] bg-white"
              />
            </div>

            <Button
              disabled={
                mutation.isPending ||
                !name.trim() ||
                !avatarUrl.trim()
              }
              onClick={handleCreateAvatar}
              className="h-11 px-6 rounded-lg bg-[#d9efd9] text-[#315d37] border border-[#c5dfc5] hover:bg-[#cbe6cb]"
            >
              {mutation.isPending ? "Creating..." : "Create Avatar"}
            </Button>

          </div>
        </section>

        {/* Avatar Heading */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-semibold">
              Avatars
            </h2>

            <p className="text-sm text-[#7a857c] mt-1">
              Your created characters
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-[#eaf5ea] text-[#54735a] text-sm border border-[#d9e9d9]">
            {query.data?.length ?? 0} avatars
          </div>
        </div>

        {/* Loading */}
        {query.isLoading && (
          <div className="text-sm text-[#7a857c]">
            Loading avatars...
          </div>
        )}

        {/* Avatar Grid */}
        {!query.isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {query.data?.map((avatar) => (
              <div
                key={avatar.id}
                className="group bg-white border border-[#e0e7e0] rounded-xl overflow-hidden hover:border-[#b8ceb9] hover:shadow-sm transition"
              >

                {/* Preview */}
                <div className="aspect-[4/5] bg-[#edf3ed] flex items-center justify-center relative">

                  {avatar.image ? (
                    <img
                      src={avatar.image}
                      alt={avatar.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-[#d9efd9] border border-[#c5dfc5] flex items-center justify-center text-2xl font-semibold text-[#46704c]">
                      {avatar.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/90 border border-[#dfe7df] text-xs text-[#5d7061]">
                    Ready
                  </div>

                </div>

                {/* Card */}
                <div className="p-4">

                  <h3 className="font-medium truncate">
                    {avatar.name}
                  </h3>

                  <p className="text-xs text-[#89938b] mt-1">
                    AI Avatar
                  </p>

                  <button
                    type="button"
                    className="mt-4 w-full h-9 rounded-lg border border-[#dfe7df] text-sm text-[#526057] hover:bg-[#f3f7f3] transition"
                  >
                    Open avatar
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

        {/* Empty State */}
        {!query.isLoading &&
          !query.isError &&
          query.data?.length === 0 && (
            <div className="bg-white border border-dashed border-[#d6dfd6] rounded-xl py-16 text-center">

              <div className="mx-auto h-12 w-12 rounded-xl bg-[#eaf5ea] flex items-center justify-center text-[#527558] text-xl">
                +
              </div>

              <h3 className="mt-4 font-medium">
                No avatars yet
              </h3>

              <p className="text-sm text-[#89938b] mt-1">
                Create your first avatar above.
              </p>

            </div>
          )}

        {/* Error */}
        {query.isError && (
          <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            Unable to load avatars.
          </div>
        )}

      </main>
    </div>
  );
}