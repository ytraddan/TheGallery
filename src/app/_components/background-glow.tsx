export default function BackgroundGlow() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="relative h-full w-full overflow-hidden bg-background">
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[100px]" />
        <div className="absolute -right-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-pink-500/10 blur-[100px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-rose-500/10 blur-[100px]" />
      </div>
    </div>
  );
}
