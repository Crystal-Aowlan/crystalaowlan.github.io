<script>
/*
  Auto-gallery for GitHub Pages.
  It lists files from images/art/ using the public GitHub API
  so you only upload images—no HTML edits needed.
*/

async function loadGallery(opts){
  const { user, repo, path, targetSelector } = opts;

  const api = `https://api.github.com/repos/${user}/${repo}/contents/${path}`;
  const res = await fetch(api);
  if(!res.ok){ console.error('Gallery fetch failed', res.status); return; }

  const files = await res.json();

  const exts = new Set(['.jpg','.jpeg','.png','.webp','.gif']);
  const images = files.filter(f => {
    const name = f.name.toLowerCase();
    return f.type === 'file' && [...exts].some(ext => name.endsWith(ext));
  });

  const grid = document.querySelector(targetSelector);
  if(!grid){ return; }

  images.forEach(f => {
    // use raw URL for direct image load
    const raw = f.download_url; // works fine on GitHub Pages
    const img = new Image();
    img.src = raw;
    img.alt = f.name.replace(/[-_]/g,' ').replace(/\.[^.]+$/,'');
    img.loading = "lazy";
    img.decoding = "async";

    const figure = document.createElement('figure');
    figure.style.margin = "0";
    figure.appendChild(img);

    grid.appendChild(figure);
  });
}
</script>
