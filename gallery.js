<script>
/*
  Gallery loader for GitHub Pages
  - Lists files in a repo folder via GitHub REST (no tokens)
  - Supports images (.jpg/.jpeg/.png/.webp/.gif) and videos (.mp4/.webm)
  - Usage: loadGallery({ user, repo, path, targetSelector })

  Notes
  - For best results keep file names lowercase with dashes, e.g. shadow-snoot.jpg
  - Very large videos may be slow on GitHub; keep them short/compact (<= 50–80MB)
*/

async function loadGallery(opts){
  const { user, repo, path, targetSelector } = opts;

  try {
    const api = `https://api.github.com/repos/${user}/${repo}/contents/${path}`;
    const res = await fetch(api, { headers: { 'Accept': 'application/vnd.github+json' }});
    if(!res.ok){ throw new Error('GitHub API error ' + res.status); }

    const entries = await res.json();
    const extsImg = new Set(['.jpg','.jpeg','.png','.webp','.gif']);
    const extsVid = new Set(['.mp4','.webm']);

    // Sort by name so things don’t jump around (you can change this)
    entries.sort((a,b) => a.name.localeCompare(b.name, undefined, {numeric:true}));

    const grid = document.querySelector(targetSelector);
    if(!grid) return;

    entries.forEach(f => {
      if (f.type !== 'file') return;
      const name = f.name.toLowerCase();

      const isImg = [...extsImg].some(ext => name.endsWith(ext));
      const isVid = !isImg && [...extsVid].some(ext => name.endsWith(ext));
      if(!isImg && !isVid) return;

      const pretty = f.name
        .replace(/\.[^.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, s => s.toUpperCase());

      const figure = document.createElement('figure');
      figure.style.margin = '0';

      if (isImg) {
        const img = new Image();
        img.src = f.download_url;
        img.alt = pretty;
        img.loading = 'lazy';
        img.decoding = 'async';
        figure.appendChild(img);
      } else if (isVid) {
        const wrap = document.createElement('div');
        wrap.style.aspectRatio = '16/9';
        wrap.style.width = '100%';
        wrap.style.overflow = 'hidden';
        wrap.style.borderRadius = '12px';
        wrap.style.border = '1px solid rgba(255,255,255,.08)';

        const vid = document.createElement('video');
        vid.src = f.download_url;
        vid.controls = true;
        vid.playsInline = true;
        vid.preload = 'metadata';   // quick load
        vid.style.width = '100%';
        vid.style.height = '100%';
        vid.style.objectFit = 'cover';

        wrap.appendChild(vid);
        figure.appendChild(wrap);
      }

      // Optional caption (hidden by default, uncomment to show)
      // const figcap = document.createElement('figcaption');
      // figcap.textContent = pretty;
      // figcap.style.marginTop = '.35rem';
      // figcap.style.fontSize = '.9rem';
      // figcap.style.color = 'var(--muted)';
      // figure.appendChild(figcap);

      grid.appendChild(figure);
    });

  } catch (e) {
    console.error('Gallery load failed:', e);
    const grid = document.querySelector(targetSelector);
    if (grid) {
      const err = document.createElement('div');
      err.className = 'card';
      err.textContent = 'Couldn’t load gallery right now.';
      grid.appendChild(err);
    }
  }
}
</script>
