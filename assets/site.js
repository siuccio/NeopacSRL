(function(){
  // Fix URL encoding for image paths with special characters (spaces, + sign, etc)
  document.querySelectorAll('img[src*="assets_nuovi"]').forEach(img=>{
    // Manually encode problematic characters
    let src = img.src;
    src = src.replace(/\s/g, '%20');  // spaces to %20
    src = src.replace(/\+/g, '%2B');  // + to %2B
    img.src = src;
  });

  // Language switching - preserve current page when changing language
  document.querySelectorAll('.lang a').forEach(link=>{
    const currentPage=window.location.pathname.split('/').pop()||'index.html';
    const targetLang=link.getAttribute('href').split('/')[1];
    link.setAttribute('href',`../${targetLang}/${currentPage}`);
  });

  // Populate video grid from videos.json
  const videoGrid=document.getElementById('videos-grid');
  if(videoGrid){
    fetch('../data/videos.json').then(r=>r.json()).then(d=>{
      d.videos.forEach(v=>{
        const a=document.createElement('a');
        a.className='card';
        a.style.gridColumn='span 4';
        a.href=`https://www.youtube.com/watch?v=${v.id}`;
        a.target='_blank';
        a.rel='noopener';
        a.innerHTML=`<img src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="YouTube" style="width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:12px"><div style="padding:8px 0;color:var(--muted)">${v.title}</div>`;
        videoGrid.appendChild(a);
      });
    }).catch(e=>console.error('Error loading videos:',e));
  }

  // Auto-scroll product carousel every 3 seconds
  const prodCarousel=document.querySelector('.prod-carousel');
  if(prodCarousel){
    setInterval(()=>{
      prodCarousel.scrollLeft+=220;
      if(prodCarousel.scrollLeft>prodCarousel.scrollWidth-prodCarousel.clientWidth){
        prodCarousel.scrollLeft=0;
      }
    },3000);
  }

  // Populate impianti sections from impianti.json
  const container=document.getElementById('sections-container');
  if(container){
    const lang=(window.location.pathname.includes('/en/')?'en':(window.location.pathname.includes('/fr/')?'fr':'it'));
    const langKey=`name_${lang}`;
    const titleKey=`title_${lang}`;
    
    // Try multiple paths for impianti.json
    const paths=['../data/impianti.json','/data/impianti.json','./data/impianti.json'];
    let fetchPromise=Promise.reject('No paths to try');
    
    for(let path of paths){
      fetchPromise=fetchPromise.catch(()=>fetch(path).then(r=>{
        if(!r.ok) throw new Error('HTTP '+r.status);
        return r.json();
      }));
    }
    
    fetchPromise.then(d=>{
      if(!d||!d.sections){
        console.warn('Invalid impianti.json structure');
        container.innerHTML='<p style="color:red">Error loading sections</p>';
        return;
      }
      
      d.sections.forEach(section=>{
        const sectionEl=document.createElement('section');
        sectionEl.className='section-content';
        
        const h2=document.createElement('h2');
        h2.textContent=section[titleKey]||section.title_it;
        h2.style.marginBottom='18px';
        sectionEl.appendChild(h2);
        
        if(!section.subsections){
          console.warn('No subsections in',section.id);
          return;
        }
        
        section.subsections.forEach(sub=>{
          const subDiv=document.createElement('div');
          subDiv.className='subsection';
          
          const h3=document.createElement('h3');
          h3.textContent=sub[titleKey]||sub.title_it;
          h3.style.marginBottom='12px';
          subDiv.appendChild(h3);
          
          const grid=document.createElement('div');
          grid.className='grid';
          grid.style.display='grid';
          grid.style.gridTemplateColumns='repeat(auto-fill,minmax(180px,1fr))';
          grid.style.gap='16px';
          
          if(!sub.items){
            console.warn('No items in',sub.id);
          }else{
            sub.items.forEach(item=>{
              const card=document.createElement('div');
              card.className='card';
              card.style.borderRadius='12px';
              card.style.overflow='hidden';
              card.style.backgroundColor='var(--surface)';
              card.style.textAlign='center';
              card.style.cursor='pointer';
              
              const img=document.createElement('img');
              let src=item.image;
              src=src.replace(/\s/g,'%20');
              src=src.replace(/\+/g,'%2B');
              img.src=src;
              img.alt=item[langKey]||item.name_it;
              img.loading='lazy';
              img.style.width='100%';
              img.style.aspectRatio='1';
              img.style.objectFit='cover';
              img.style.display='block';
              
              const name=document.createElement('p');
              name.textContent=item[langKey]||item.name_it;
              name.style.padding='8px';
              name.style.margin='0';
              name.style.color='var(--text)';
              name.style.fontSize='0.85rem';
              
              card.appendChild(img);
              card.appendChild(name);
              grid.appendChild(card);
            });
          }
          
          subDiv.appendChild(grid);
          sectionEl.appendChild(subDiv);
        });
        
        container.appendChild(sectionEl);
      });
      console.log('Impianti loaded successfully');
      
      // Load impianti carousel on chi-siamo pages
      loadImplantiCarousel(d);
    }).catch(e=>{
      console.error('Error loading impianti from all paths:',e);
      container.innerHTML='<p style="color:red">Error loading sections. Check console.</p>';
    });
  } else {
    // No sections-container on this page - check if there are impianti carousels (chi-siamo pages)
    const carousels=document.querySelectorAll('.impianti-carousel');
    if(carousels.length>0){
      const lang=(window.location.pathname.includes('/en/')?'en':(window.location.pathname.includes('/fr/')?'fr':'it'));
      const paths=['../data/impianti.json','/data/impianti.json','./data/impianti.json'];
      let fetchPromise=Promise.reject('No paths to try');
      
      for(let path of paths){
        fetchPromise=fetchPromise.catch(()=>fetch(path).then(r=>{
          if(!r.ok) throw new Error('HTTP '+r.status);
          return r.json();
        }));
      }
      
      fetchPromise.then(d=>{
        loadImplantiCarousel(d);
      }).catch(e=>console.error('Error loading impianti for carousel:',e));
    }
  }
  
  // Function to load impianti carousel on about pages
  function loadImplantiCarousel(data){
    const lang=(window.location.pathname.includes('/en/')?'en':(window.location.pathname.includes('/fr/')?'fr':'it'));
    const carousel=document.getElementById(`impianti-carousel-${lang}`);
    if(!carousel) return;
    
    const langKey=`name_${lang}`;
    const allImpianti=[];
    
    // Collect all items from all sections and subsections
    if(data.sections){
      data.sections.forEach(section=>{
        if(section.subsections){
          section.subsections.forEach(sub=>{
            if(sub.items){
              sub.items.forEach(item=>{
                allImpianti.push(item);
              });
            }
          });
        }
      });
    }
    
    // Display first 12 impianti as images only (marquee style)
    allImpianti.slice(0,12).forEach(item=>{
      const img=document.createElement('img');
      let src=item.image;
      src=src.replace(/\s/g,'%20');
      src=src.replace(/\+/g,'%2B');
      img.src=src;
      img.alt=item[langKey]||item.name_it;
      img.title=item[langKey]||item.name_it;
      img.style.cursor='pointer';
      img.addEventListener('click',()=>{
        window.location.href='impianti.html';
      });
      carousel.appendChild(img);
    });
    
    // Clone images for seamless loop
    const images=carousel.querySelectorAll('img');
    images.forEach(img=>{
      const clone=img.cloneNode(true);
      clone.addEventListener('click',()=>{
        window.location.href='impianti.html';
      });
      carousel.appendChild(clone);
    });
    
    // Create and inject animation keyframes dynamically
    const totalImages=carousel.querySelectorAll('img').length;
    const duration=totalImages*5; // 5 seconds per image
    const keyframes=`@keyframes marquee-carousel{0%{transform:translateX(0);}100%{transform:translateX(-${(totalImages-1)*100}%)}}`;
    const style=document.createElement('style');
    style.textContent=keyframes;
    document.head.appendChild(style);
    
    carousel.style.animation=`marquee-carousel ${duration}s linear infinite`;
  }
})();