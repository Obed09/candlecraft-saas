import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ChatWidget from "@/components/ChatWidget";
import DashboardFooter from "@/components/DashboardFooter";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader user={session.user} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
          
          {/* Footer */}
          <DashboardFooter />
        </main>
      </div>
      
      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
