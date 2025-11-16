export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      <nav className="bg-white dark:bg-neutral-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
