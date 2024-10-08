import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Welcome to central Wisconsin&apos;s restaurant catalog!
        Please select which restaurant you are in.</h1>
        <div>
          <p><Link href="restaurants/chubbys">Chubby&apos;s</Link></p>
          <p><Link href="restaurants/vuam">Vuam</Link></p>
          
        </div>
      </div>
    </main>
  );
}
