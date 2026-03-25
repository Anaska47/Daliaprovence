import re

def count_slugs(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        matches = re.findall(r"slug\s*:\s*['\"]([^'\"]+)['\"]", content)
        return len(matches)

sitemap_count = count_slugs(r"c:\Users\nskad\Downloads\daliaprovence-landing-page\generate-sitemap.js")
locations_count = count_slugs(r"c:\Users\nskad\Downloads\daliaprovence-landing-page\src\data\locations.ts")

print(f"Sitemap locations: {sitemap_count}")
print(f"Data locations: {locations_count}")
