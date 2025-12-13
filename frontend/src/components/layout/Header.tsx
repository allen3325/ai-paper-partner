interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="bg-white px-8 py-5 border-b border-gray-200 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-slate-900 tracking-tight">{title}</h1>
      {/* <div className="flex gap-4 items-center text-gray-400">
        <Zap className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
        <Clock className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
        <Circle className="w-5 h-5 cursor-pointer hover:text-gray-600 transition-colors" />
      </div> */}
    </div>
  );
}
