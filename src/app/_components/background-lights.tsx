export default function BackgroundLights() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="relative h-full w-full overflow-hidden bg-background">
        {/* Top Center */}
        <div className="absolute left-1/2 hidden h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px] 2xl:block" />

        {/* Top Left */}
        <div className="absolute -left-[10%] -top-[20%] hidden h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[100px] 2xl:block" />

        {/* Top Right */}
        <div className="absolute -right-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-[100px]" />

        {/* Bottom Left */}
        <div className="absolute -bottom-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-pink-500/10 blur-[100px]" />

        {/* Bottom Right */}
        <div className="absolute -bottom-[20%] -right-[10%] hidden h-[600px] w-[600px] rounded-full bg-rose-500/10 blur-[100px] 2xl:block" />
      </div>
    </div>
  );
}
