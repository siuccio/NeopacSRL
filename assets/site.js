(function(){
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
              img.src=item.image;
              img.alt=item[langKey]||item.name_it;
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
    }).catch(e=>{
      console.error('Error loading impianti from all paths:',e);
      container.innerHTML='<p style="color:red">Error loading sections. Check console.</p>';
    });
  }

  // Filter functionality for impianti
  const q=document.getElementById('q');
  const applyBtn=document.getElementById('apply');
  if(q&&applyBtn&&container){
    function filterItems(){
      const query=q.value.toLowerCase();
      container.querySelectorAll('.card').forEach(card=>{
        const text=card.textContent.toLowerCase();
        card.style.display=text.includes(query)?'':'none';
      });
    }
    applyBtn.addEventListener('click',filterItems);
    q.addEventListener('keydown',e=>{
      if(e.key==='Enter') filterItems();
    });
  }
})();