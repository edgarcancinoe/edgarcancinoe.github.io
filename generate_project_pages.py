#!/usr/bin/env python3
"""
Script to generate dedicated project pages from project card HTML files.
"""

import os
import re
from pathlib import Path

# Base directory
BASE_DIR = Path("/Users/edgarcancino/Documents/Projects/edgarcancinoe.github.io")
CARDS_DIR = BASE_DIR / "project_cards"
PROJECTS_DIR = BASE_DIR / "projects"

# Template for project pages
TEMPLATE = '''<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
   <link crossorigin="" href="https://fonts.gstatic.com/" rel="preconnect" />
    <link as="style"
        href="https://fonts.googleapis.com/css2?display=swap&amp;family=Noto+Sans%3Awght%40400%3B500%3B700%3B900&amp;family=Space+Grotesk%3Awght%40400%3B500%3B700&amp;family=Spline+Sans%3Awght%40400%3B500%3B700"
        onload="this.rel='stylesheet'" rel="stylesheet" />
    <title>{title} | Jose Edgar Hernandez</title>
    <link href="../logo.webp" rel="icon" type="image/webp" />
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <style type="text/tailwindcss">
        @layer base {{
      :root {{
        --bg-root:        #111714;
        --bg-surface:     #161d1a;
        --bg-panel:       #1c2620;
        --bd-muted:       #29382f;
        --bd-strong:      #3d5245;

        --fg-primary:     #ffffff;
        --fg-secondary:   #e5e7eb;
        --fg-muted:       #9eb7a8;
        --fg-subtle:      #8aa096;

        --brand:          #38e07b;
        --brand-600:      #2dd06f;
        --brand-700:      #23b85f;
        --brand-800:      #1a9e52;
        --brand-900:      #138446;
        --brand-tint:     #b9f2cf;

        --teal-600:       #27c1a7;
        --teal-800:       #126d60;

        --shadow-strong:  0 10px 24px rgba(0,0,0,.35), 0 4px 8px rgba(0,0,0,.25);
      }}
    }}

    @layer utilities {{
      .text-muted  {{ color: var(--fg-muted); }}
      .text-subtle {{ color: var(--fg-subtle); }}
      .panel       {{ background: var(--bg-panel); border: 1px solid var(--bd-strong); }}
      .btn-brand   {{ background: var(--brand); color: var(--bg-root); }}
      .btn-brand:hover {{ background: var(--brand-600); box-shadow: 0 0 0 6px color-mix(in srgb, var(--brand) 25%, transparent); }}
    }}

    html {{ scroll-behavior: smooth; }}
    .reveal {{ opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }}
    .reveal.show {{ opacity: 1; transform: none; }}
    @media (prefers-reduced-motion: reduce) {{
      .reveal {{ transition: none; opacity: 1; transform: none; }}
    }}
  </style>
</head>

<body>
    <div class="relative flex size-full min-h-screen flex-col dark group/design-root overflow-x-hidden"
        style='font-family: "Spline Sans", "Noto Sans", sans-serif; background: var(--bg-root);'>
        <div class="layout-container flex h-full grow flex-col">

            <!-- Header -->
            <header
                class="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#29382f] px-5 sm:px-10 py-3 sm:py-4 fixed top-0 left-0 right-0 bg-[#111714]/80 backdrop-blur-sm z-50 font-['Space_Grotesk',_'Noto_Sans',_sans-serif]">
                <div class="flex items-center gap-3 text-white">
                    <svg class="text-[#38e07b]" fill="none" height="24" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 16.5 8 18l-6-6 6-6 2 1.5"></path>
                        <path d="m14 7.5 2-1.5 6 6-6 6-2-1.5"></path>
                        <path d="M12 8v8"></path>
                    </svg>
                    <div>
                        <h2 class="text-white text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em]">
                            <a href="../index.html" class="hover:text-[#38e07b] transition-colors">
                                <span class="sm:hidden">J. Edgar Hernandez</span>
                                <span class="hidden sm:inline">Jose Edgar Hernandez Cancino E.</span>
                            </a>
                        </h2>
                    </div>
                </div>
                <div class="flex flex-1 justify-end gap-4 items-center">
                    <div class="hidden sm:flex items-center gap-8">
                        <a class="text-gray-300 hover:text-white transition-colors text-base font-medium leading-normal"
                            href="../index.html">About</a>
                        <a class="text-gray-300 hover:text-white transition-colors text-base font-medium leading-normal"
                            href="../projects.html">Projects</a>
                        <a class="text-gray-300 hover:text-white transition-colors text-base font-medium leading-normal"
                            href="../contact.html">Contact</a>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="flex-1 mt-20 pb-16">
                <!-- Hero Section -->
                <section class="px-4 sm:px-8 lg:px-20 py-12 sm:py-16 bg-[#0c1511]">
                    <div class="max-w-4xl mx-auto">
                        <!-- Back link -->
                        <a href="../projects.html"
                            class="inline-flex items-center gap-2 text-[var(--fg-muted)] hover:text-[var(--brand)] transition-colors mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Back to Projects
                        </a>

                        <!-- Title -->
                        <div class="mb-8 reveal">
                            <p class="text-[var(--brand)] text-sm font-semibold mb-2 uppercase tracking-wider">{institution} — {year}</p>
                            <h1 class="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                                {title}
                            </h1>
                        </div>

                        <!-- Tags -->
                        <div class="flex flex-wrap gap-2 mb-8 reveal">
{tags}
                        </div>
                    </div>
                </section>

                <!-- Content Section -->
                <section class="px-4 sm:px-8 lg:px-20 py-12 bg-[#0f1a15]">
                    <div class="max-w-4xl mx-auto">

                        <!-- Project Media -->
                        <div class="panel rounded-2xl p-4 mb-8 reveal">
{media}
                        </div>

                        <!-- Project Description -->
                        <article class="prose prose-invert max-w-none reveal">
                            <h2 class="text-white text-2xl sm:text-3xl font-bold mb-6">Overview</h2>
{description}

                            <!-- External Links -->
                            <div class="mt-8">
                                <h3 class="text-white text-xl font-bold mb-4">Resources</h3>
                                <div class="flex flex-wrap gap-4">
{links}
                                </div>
                            </div>
                        </article>

                    </div>
                </section>

            </main>

            <!-- Footer -->
            <footer class="border-t border-solid border-t-[var(--bd-muted)] px-5 sm:px-10 py-4 z-50"
                style="background: var(--bg-surface);">
                <div class="max-w-7xl mx-auto flex justify-between items-center text-white">
                    <div class="flex items-center gap-3">
                        <p class="text-[var(--fg-secondary)] text-sm"> 2025<span class="text-subtle mr-2 ml-2">|</span>
                            <span class="sm:hidden"> J.E.H.C.E.</span>
                            <span class="hidden sm:inline"> Jose Edgar Hernandez Cancino Estrada</span>
                        </p>
                    </div>
                    <div class="hidden sm:flex items-center gap-4">
                        <a class="text-gray-300 hover:text-[var(--brand)] transition-colors"
                            href="https://www.linkedin.com/in/edgar-cancino/">
                            <svg class="feather feather-linkedin" fill="none" height="20" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                width="20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z">
                                </path>
                                <rect height="12" width="4" x="2" y="9"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                        <a class="text-gray-300 hover:text-[var(--brand)] transition-colors"
                            href="https://github.com/edgarcancinoe">
                            <svg class="feather feather-github" fill="none" height="20" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                width="20" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    </div>

    <!-- Reveal animation script -->
    <script>
        (function () {{
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced) return;
            const els = document.querySelectorAll('.reveal');
            const io = new IntersectionObserver((entries) => {{
                entries.forEach(entry => {{
                    if (entry.isIntersecting) {{
                        entry.target.classList.add('show');
                        io.unobserve(entry.target);
                    }}
                }});
            }}, {{ threshold: 0.12 }});
            els.forEach(el => io.observe(el));
        }})();
    </script>
</body>

</html>'''

def extract_card_data(card_html):
    """Extract relevant data from a project card HTML file."""
    
    # Extract title
    title_match = re.search(r'<h3[^>]*>(.*?)<span class="ml-2', card_html, re.DOTALL)
    if title_match:
        title = re.sub(r'<[^>]+>', '', title_match.group(1)).strip()
    else:
        title = "Project"
    
    # Extract year
    year_match = re.search(r'<span[^>]*>(\d{4})</span>', card_html)
    year = year_match.group(1) if year_match else "2024"
    
    # Extract institution
    inst_match = re.search(r'<span class="text-xs text-white">(.*?)</span>', card_html)
    institution = inst_match.group(1) if inst_match else "Personal"
    
    # Extract description
    desc_match = re.search(r'<p class="text-\[#9eb7a8\][^>]*>(.*?)</p>', card_html, re.DOTALL)
    description = desc_match.group(1).strip() if desc_match else ""
    
    # Convert description to proper paragraphs
    desc_parts = [p.strip() for p in description.split('<br>') if p.strip()]
    desc_html = '\n'.join([f'                            <p class="text-[var(--fg-secondary)] text-lg leading-relaxed mb-6">\n                                {part}\n                            </p>' for part in desc_parts])
    
    # Extract tags
    tags = re.findall(r'<span class="px-2 py-1 bg-\[#38e07b\]/20[^>]*>(.*?)</span>', card_html)
    tags_html = '\n'.join([f'                            <span class="px-3 py-1 rounded-full text-sm bg-[var(--brand)]/15 text-[var(--brand)] border border-[var(--brand)]/30">{tag}</span>' for tag in tags])
    
    # Extract media (image or video)
    video_match = re.search(r'<video[^>]*>.*?</video>', card_html, re.DOTALL)
    if video_match:
        media = video_match.group(0)
        # Update paths to go up one level
        media = re.sub(r'src="images/', 'src="../images/', media)
        media = '                            ' + media.replace('\n', '\n                            ')
    else:
        img_match = re.search(r'<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*/?>', card_html)
        if img_match:
            alt_text, img_src = img_match.groups()
            media = f'<img src="../{img_src}" alt="{alt_text}" class="w-full rounded-lg" />'
        else:
            media = ''
    
    # Extract links
    links_matches = re.findall(r'<a href="([^"]*)"[^>]*target="_blank"[^>]*>.*?<span[^>]*>(.*?)</span>', card_html, re.DOTALL)
    links_html = []
    for url, link_text in links_matches:
        # Fix relative URLs
        if url.startswith('projects/'):
            url = '../' + url
        
        links_html.append(f'''                                    <a href="{url}" target="_blank"
                                        class="inline-flex items-center px-6 py-3 rounded-full bg-[var(--brand)] text-[var(--bg-root)] font-semibold hover:bg-[var(--brand-600)] transition-all hover:scale-105">
                                        <svg class="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                        </svg>
                                        {link_text.strip()}
                                    </a>''')
    
    return {
        'title': title,
        'year': year,
        'institution': institution,
        'description': desc_html,
        'tags': tags_html,
        'media': media,
        'links': '\n'.join(links_html) if links_html else '                                    <p class="text-[var(--fg-muted)]">No additional resources available.</p>'
    }

# Map of card files to output filenames  
PROJECT_MAP = {
    'AI/gnn_noisy_labels.html': 'gnn_noisy_labels.html',
    'AI/xarm_ddpg_her.html': 'xarm_ddpg_her.html',
    'computer_vision/maybe_obstacle.html': 'maybe_obstacle.html',
    'data_science/truck_loading_durations.html': 'truck_loading_durations.html',
    'embedded/air_pressure_control.html': 'air_pressure_control.html',
    'embedded/sapienza_iot.html': 'sapienza_iot.html',
    'embedded/smart_parking.html': 'smart_parking.html',
    'robotics/IBVS.html': 'ibvs.html',
    'robotics/ekf_corner_detection.html': 'ekf_corner_detection.html',
    'robotics/final_implementation_manipulator.html': 'puzzlebot_manipulator.html',
    'robotics/home_ddpg_ros.html': 'home_ddpg_ros.html',
    'robotics/scene_grasp.html': 'scene_grasp.html',
    'robotics/self_driving_autonomous_vehicle.html': 'self_driving_autonomous_vehicle.html',
    'robotics/xarm6_visual_servoing.html': 'xarm6_visual_servoing.html',
    'signals/music_recognition.html': 'music_recognition.html',
}

def main():
    """Generate all project pages."""
    created_count = 0
    
    for card_path, output_name in PROJECT_MAP.items():
        card_file = CARDS_DIR / card_path
        output_file = PROJECTS_DIR / output_name
        
        print(f"Processing {card_path}...")
        
        # Read the card HTML
        with open(card_file, 'r', encoding='utf-8') as f:
            card_html = f.read()
        
        # Extract data
        data = extract_card_data(card_html)
        
        # Generate the page
        page_html = TEMPLATE.format(**data)
        
        # Write the output
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(page_html)
        
        created_count += 1
        print(f"  ✓ Created {output_name}")
    
    print(f"\n✅ Successfully created {created_count} project pages!")

if __name__ == "__main__":
    main()
