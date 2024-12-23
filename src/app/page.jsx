'use client'
import Image from "next/image";
import Header from "@/components/Header";
import Tasklist from "@/components/Tasklist";
export default function Home() {
  return (
  <div className="bg-gradient-to-br from-[#91AEC4] from-50% to-[#DBECF4] to-50% h-screen">
    <Header/>
    <Tasklist/>
  </div>
  );
}
