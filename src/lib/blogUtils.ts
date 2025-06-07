export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage?: string;
  readingTime: string;
}

// This will be our "database" of blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'doing-more-while-doing-less',
    title: 'Doing More While Doing Less',
    date: '2025-06-08',
    excerpt: 'Reflections on burnout, productivity, and finding a sustainable pace in development.',
    content: `
      <div class="blog-content">
        <p>This year's been weird. Good weird, but weird. Starting from January, I went into full "I'll do everything by myself" mode. Built a strict, rigid timetable. Talked to fewer people. Had these huge goals and plans all lined up. I thought that if I just did everything every day, I'd somehow reach all my goals faster.</p>
        
        <p>Looking back, I also realise I'd become kind of entitled in a not-so-great way. I genuinely believed I could do everything on my own, and while that confidence wasn't entirely misplaced, it made me ignore how much pressure I was putting on myself.</p>
        
        <p>So, I stacked up game development (my main goal), C++ (still the best decision), math (not entirely necessary but fun and useful now), reading books I'd downloaded, understanding AI (because why not learn sigmoid functions 3 days before an exam), and more—into a single day. Every day.</p>
        
        <p>Result? Burnout. A lot of it. I had days where I'd just sit in front of my screen and do absolutely nothing. Not procrastinating, not scrolling, just... blank. Trying to learn foundational models was fun, yeah, but spending three days on activation functions while exam pressure loomed? Not the brightest moment, even though I did enjoy every bit of it.</p>
        
        <p>And these kinds of days became normal. I wasn't lazy. I was just exhausted. I didn't cut myself any slack. Everything felt urgent. I thought doing more would get me further, faster. Turns out, that doesn't scale. You hit a wall.</p>
        
        <p>So, somewhere in the last couple of months, I shifted gears. Trimmed the fat—cut out unnecessary goals, gave up on doing everything every day. Started working with daily goals that align with my big plans but are smaller, more doable. Every morning I decide what I need and want to do that day, then I just do that. Not more. And somehow, that helped me get more done.</p>
        
        <p>There were some low weeks too. Times when productivity dipped and I became a bit too complacent. I'd set deadlines, miss them, and then feel like crap. I'd aim too high—thinking I could do five days of work in two—and end up with incomplete game jam entries or half-baked blog ideas.</p>
        
        <p>Something that really helped in those moments was journaling—just writing down everything going on in my head. It's strange how putting thoughts into words makes them lighter.</p>
        
        <p>But now I've reached this somewhat sweet spot. The core goals are clear—build my game engine, get better at C++, write blogs, grow my knowledge, eventually launch my own games and company. But the real progress happens in the small, daily wins(i feel dumb because this is the exact thing that atomic habits teaches and i read it like a year ago).</p>
        
        <p>I still think too much—about everything, every tiny detail. But I've calmed down. I'm taking things slowly and just doing everything I can. The funny part is, I'm still getting more done than before.</p>
        
        <p>I still get anxious, not gonna lie. This whole path is unconventional. But it's fun. Debugging my games and debugging my life kind of feel the same now. There's a bug, I find it, fix it. Move on. Better every day.</p>
        
        <p>I'm going to be doing these blogs every Sunday. Just talking about whatever's on my mind or what I'm working on. The next one's going to be about how I built Conway's Game of Life in the terminal. It was a small project but a fun one—seeing patterns evolve right in the terminal window, all from my own little C++ world. The kind of stuff that reminds me why I love doing this.</p>
        
        <p>Anyway, if I had to give a single piece of advice from the last six months: slow down. Do one thing at a time. Every time I sat down to do one task, a million others popped up in my head, and I'd end up doing nothing. Don't fall into that trap. Focus on what's in front of you. Finish it. Then move.</p>
        
        <p>Till next week. Keep building.</p>
      </div>
    `,
    tags: ["Life"],
    readingTime: "4 min read"
  }
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts];
}

export function getSortedPosts(): BlogPost[] {
  return getAllPosts().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find(post => post.slug === slug);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.tags.includes(tag)
  );
}

// Function to add new blog post (would typically connect to a backend/CMS)
export function addBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
  const newPost = {
    ...post,
    id: (blogPosts.length + 1).toString()
  };
  
  blogPosts.push(newPost);
  return newPost;
} 