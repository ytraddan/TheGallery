export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-xl font-semibold">Page Not Found</h2>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
    </div>
  );
}
