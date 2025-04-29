export default function AnimatedHeadline() {
  const text = 'Selamat Datang di Sistem KPI Karyawan';

  return (
    <h1 className="text-lg md:text-3xl font-bold mb-4 tracking-tight flex flex-wrap justify-center">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block opacity-0 fall"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
}
