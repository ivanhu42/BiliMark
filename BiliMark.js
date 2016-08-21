javascript:(()=>{
  let target=document.getElementsByClassName('tminfo')[0];
  let loadLink=(video,danmuku,cover)=>{
    let a=document.createElement('a');
    let div=document.createElement('div');
    a.className='BiliMark';
    a.style.padding='0 0 0 1em';
    a.innerHTML='[视频]';
    a.href=video;
    div.appendChild(a);
    target.innerHTML+=div.innerHTML;
    if(danmuku){
      a.innerHTML='[弹幕]';
      a.href=danmuku;
      div.appendChild(a);
      target.innerHTML+=div.innerHTML;
    }
    if(cover){
      a.innerHTML='[封面]';
      a.href=cover;
      div.appendChild(a);
      target.innerHTML+=div.innerHTML;
    }
  };
  if(document.getElementsByClassName('BiliMark').length!=0){
    while(document.getElementsByClassName('BiliMark').length!=0){
      target.removeChild(document.getElementsByClassName('BiliMark')[0]);
    }
  }else{
    let page=document.getElementById('plist').children;
    if(page.length==0){
      let url='http://www.bilibili.com/m/html5?aid='+aid+'&page=1';
      let request=new XMLHttpRequest();
      request.open("GET",url,true);
      request.onreadystatechange=()=>{
        if(request.readyState==4){
          let r=JSON.parse(request.responseText);
          loadLink(r.src,r.cid,r.img);
        }
      };
      request.send();
    }else{
      for(let i=0;i<=page.length;i++){
        if(page[i].className=='curPage'){
          let url='http://www.bilibili.com/m/html5?aid='+aid+'&page='+(i+1);
          let request=new XMLHttpRequest();
          request.open("GET",url,true);
          request.onreadystatechange=()=>{
            if(request.readyState==4){
              let r=JSON.parse(request.responseText);
              loadLink(r.src,r.cid,r.img);
            }
          };
          request.send();
        }
      }
    }
  }
})();
