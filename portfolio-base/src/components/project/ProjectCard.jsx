import React from "react";

/**
 * ProjectShowcase
 * - Displays project cards in the style of the provided reference.
 * - Uses Tailwind CSS only.
 * - Removes the small green badges entirely.
 * - Drops the two middle items (keeps only the 1st, 4th, and 5th items from the input order by default).
 *
 * Replace the sample `projects` content with your real data.
 */


export default function ProjectCard({ project, corner, index }) {
    // "md" trong Tailwind CSS là breakpoint cho màn hình >= 768px (tablet trở lên).
    // Màn hình điện thoại là "sm" (>= 640px) hoặc nhỏ hơn (mặc định là mobile-first).
    // Nếu muốn bo góc cho điện thoại, dùng rounded-l-2xl hoặc rounded-r-2xl (không có prefix).
    // Nếu chỉ muốn bo góc ở tablet trở lên, dùng md:rounded-l-2xl hoặc md:rounded-r-2xl.
    // let cornerClass = 'sm:rounded-full';
    // if (corner === 'left') {
    //   cornerClass = 'md:rounded-l-2xl';
    // } else if (corner === 'right') {
    //   cornerClass = 'md:rounded-r-2xl';
    // }

  return (
    <div className="group relative flex flex-col cursor-pointer bg-transparent">
      {/* Poster */}
      <div className="relative sm:h-100 md:h-70 overflow-hidden rounded-t-2xl">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105 h-56 sm:h-64 md:h-72 lg:h-80 rounded-t-2xl"
        />
      </div>

      {/* Combined background for title, subtitle, meta, and rank */}
      <div className="w-full rounded-b-2xl bg-blue-500 text-black px-4 py-4">
        <div className="flex gap-8 items-center">
          <div className=""> 
            <h3 className="text-[3rem] font-semibold leading-tight text-white italic -skew-y-6"> {index} </h3>
          </div>

          <div className="">
            <h3 className="text-lg font-semibold leading-tight text-white/90"> {project.title} </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/70">
              {project.stack_name.map((m, i) => (
                <span key={i} className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5"> {m} </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay hiển thị description khi hover */}
      {/* Ghi đè hoàn toàn phần rank, title, meta khi hover */}
      <div className="absolute inset-x-0 bottom-0 z-20 w-full rounded-b-2xl bg-black/95 flex items-center justify-center min-h-[120px] transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
        <div className="px-6 py-4 text-center w-full">
          <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
          <p className="text-white text-base">
            <span dangerouslySetInnerHTML={{ __html: project.short_description || "" }} />
          </p>
        </div>
      </div>
    </div>
  );
}
