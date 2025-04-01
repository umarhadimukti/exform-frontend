import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col sm:flex-row justify-center gap-5 items-center w-full container mx-auto">
        <div>
          <Image src="/images/exform_logo.png" alt="logo" width={350} height={350} priority quality={100}/>
        </div>
        <div>
          <h5 className="text-gray-700 tracking-wide">Welcome to our app.</h5>
          <div className="flex flex-col sm:flex-row mt-2 gap-2">
            <Button className="cursor-pointer">Login</Button>
            <Button className="cursor-pointer" variant='outline'>Register</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
