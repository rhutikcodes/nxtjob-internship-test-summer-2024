import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="bg-purple-200 flex justify-center items-center h-screen">
      <SignIn path="/sign-in" />
    </div>
  );
}
