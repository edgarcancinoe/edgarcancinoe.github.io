#!/usr/bin/env python3
"""
Script to update project card HTML files to include clickable links to dedicated pages.
"""

import os
from pathlib import Path

BASE_DIR = Path("/Users/edgarcancino/Documents/Projects/edgarcancinoe.github.io")
CARDS_DIR = BASE_DIR / "project_cards"

# Mapping of card paths to dedicated page paths
PROJECT_LINKS = {
    'AI/Score-BasedGenerativeModeling.html': 'projects/score_based_generative_modeling.html',
    'AI/gnn_noisy_labels.html': 'projects/gnn_noisy_labels.html',
    'AI/xarm_ddpg_her.html': 'projects/xarm_ddpg_her.html',
    'computer_vision/maybe_obstacle.html': 'projects/maybe_obstacle.html',
    'data_science/truck_loading_durations.html': 'projects/truck_loading_durations.html',
    'embedded/air_pressure_control.html': 'projects/air_pressure_control.html',
    'embedded/sapienza_iot.html': 'projects/sapienza_iot.html',
    'embedded/smart_parking.html': 'projects/smart_parking.html',
    'robotics/IBVS.html': 'projects/ibvs.html',
    'robotics/ekf_corner_detection.html': 'projects/ekf_corner_detection.html',
    'robotics/final_implementation_manipulator.html': 'projects/puzzlebot_manipulator.html',
    'robotics/home_ddpg_ros.html': 'projects/home_ddpg_ros.html',
    'robotics/scene_grasp.html': 'projects/scene_grasp.html',
    'robotics/self_driving_autonomous_vehicle.html': 'projects/self_driving_autonomous_vehicle.html',
    'robotics/xarm6_visual_servoing.html': 'projects/xarm6_visual_servoing.html',
    'signals/music_recognition.html': 'projects/music_recognition.html',
}

def wrap_with_link(card_html, link_url):
    """Wrap the card div with a clickable link."""
    
    # Find the opening div tag
    if '<div class="flex flex-col gap-4 group">' in card_html:
        # Add the link wrapper
        wrapped = f'<a href="{link_url}" class="block no-underline hover:no-underline transition-all duration-300">\n{card_html}</a>'
        return wrapped
    return card_html

def main():
    """Update all project card files with links."""
    updated_count = 0
    
    for card_path, link_url in PROJECT_LINKS.items():
        card_file = CARDS_DIR / card_path
        
        if not card_file.exists():
            print(f"⚠️  Card file not found: {card_path}")
            continue
        
        print(f"Processing {card_path}...")
        
        # Read the card HTML
        with open(card_file, 'r', encoding='utf-8') as f:
            card_html = f.read()
        
        # Check if already wrapped
        if '<a href=' in card_html and card_html.strip().startswith('<a href='):
            print(f"  → Already has link, skipping")
            continue
        
        # Wrap with link
        updated_html = wrap_with_link(card_html, link_url)
        
        # Write back
        with open(card_file, 'w', encoding='utf-8') as f:
            f.write(updated_html)
        
        updated_count += 1
        print(f"  ✓ Added link to {link_url}")
    
    print(f"\n✅ Successfully updated {updated_count} project cards!")

if __name__ == "__main__":
    main()
