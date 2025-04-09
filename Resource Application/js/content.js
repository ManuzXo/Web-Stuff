class Resources {
  constructor() {
    // -- DOM  --
    this.popup = null;
    this.popupResizeRight = null;
    this.popupResizeBottom = null;
    this.popupTitle = null;
    this.openBtn = null;
    this.closeBtn = null;
    // -- PROP --
    this.popupShow = false;
    this.popupLeft = undefined;
    this.popupTop = undefined;
    this.popupResizeX = undefined;
    this.popupResizeY = undefined;
    this.popupWidth = undefined;
    this.popupHeigth = undefined;
    // -- VARIABLES -- 
    this.previusPropertys = {};
    this.popOffsetX = undefined;
    this.popOffsetY = undefined;
    this.popupMoveCallback = this.PopupMouseMove.bind(this);
    this.popupUpCallback = this.PopupMouseUp.bind(this);
    this.popupResizeMoveCallback = this.PopUpResizeMouseMove.bind(this);
    this.popupResizeUpCallback = this.PopUpResizeMouseUp.bind(this);
    this.dataSchema = {
      _popupShow: {
        get: () => this.popupShow,
        set: val => this.popupShow = val === "true"
      },
      _popupLeft: {
        get: () => this.popup.style.left,
        set: val => this.popupLeft = val
      },
      _popupTop: {
        get: () => this.popup.style.top,
        set: val => this.popupTop = val
      },
      _popupWidth: {
        get: () => this.popup.style.width,
        set: val => this.popupWidth = val
      },
      _popupHeigth: {
        get: () => this.popup.style.height,
        set: val => this.popupHeigth = val
      },
      _previusPropertys: {
        get: () => JSON.stringify(this.previusPropertys),
        set: val => this.previusPropertys = JSON.parse(val)
      }
    };
    
    this.GetData();
    this.CreatePopup();
    this.CreateOpenBtn();
    this.CreateCloseBtn();
    this.CreateTitle();
    this.CreateTabs();
  }

  CreatePopup() {
    this.popup = document.createElement("div");
    this.popup.classList.add("popup");

    this.popup.style.width = this.popupWidth || "auto";
    this.popup.style.height = this.popupHeigth || "auto";
    this.popup.style.left = this.popupLeft || "50%";
    this.popup.style.top = this.popupTop || "50%";
    if(this.popupShow)
      this.popup.classList.add("show");

    this.PopUpDraggable();
    this.PopUpResize();
    document.body.appendChild(this.popup);
  }

  PopUpDraggable(){
    this.popup.addEventListener("mousedown", this.PopupMouseDown.bind(this));
  }
  PopUpResize(){
    this.popupResizeRight = document.createElement("div");
    this.popupResizeRight.classList.add("popup-resizer", "popup-resizer-right");
    this.popupResizeRight.addEventListener("mousedown", this.PopUpResizeMouseDown.bind(this));
    
    this.popupResizeBottom = document.createElement("div");
    this.popupResizeBottom.classList.add("popup-resizer", "popup-resizer-bottom");
    this.popupResizeBottom.addEventListener("mousedown", this.PopUpResizeMouseDown.bind(this));


    this.popup.appendChild(this.popupResizeRight);
    this.popup.appendChild(this.popupResizeBottom);
  }

  
  PopupMouseDown(event) {
    event.stopPropagation();
    this.isDragging = true;
    this.popup.style.cursor = "grabbing";
    
    const _rect = this.popup.getBoundingClientRect();
    this.popOffsetX = (event.clientX - _rect.left);
    this.popOffsetY = (event.clientY - _rect.top);

    document.addEventListener("mousemove", this.popupMoveCallback);
    document.addEventListener("mouseup", this.popupUpCallback);
    console.log("PopupMouseDown");
  }

  PopupMouseMove(event) {
    event.stopPropagation();
    this.popup.style.left = `${event.clientX - this.popOffsetX}px`;
    this.popup.style.top =  `${event.clientY - this.popOffsetY}px`;
    console.log("PopupMouseMove");
  }

  PopupMouseUp(event) {
    event.stopPropagation();
    this.popup.style.cursor = "grab";
    this.SetData();
    document.removeEventListener("mousemove", this.popupMoveCallback);
    document.removeEventListener("mouseup", this.popupUpCallback);
    console.log("PopupMouseUp");
  }

  PopUpResizeMouseDown(event) {
    event.stopPropagation();
    this.popupResizeX = event.clientX;
    this.popupResizeY = event.clientY;
    let _style = window.getComputedStyle(this.popup);
    this.popupWidth = parseInt(_style.width, 10);
    this.popupHeigth = parseInt(_style.height, 10);
    document.addEventListener("mousemove", this.popupResizeMoveCallback);
    document.addEventListener("mouseup", this.popupResizeUpCallback);
    console.log("PopUpResizeMouseDown");
  }
  PopUpResizeMouseMove(event) {
    event.stopPropagation();
    let _dx = event.clientX - this.popupResizeX;
    let _dy = event.clientY - this.popupResizeY;
    this.popup.style.width = (this.popupWidth + _dx) + "px";
    this.popup.style.height = (this.popupHeigth + _dy) + "px";
    console.log("PopUpResizeMouseMove");
  }
  PopUpResizeMouseUp(event) {
    event.stopPropagation();
    this.SetData();
    document.removeEventListener("mousemove", this.popupResizeMoveCallback);
    document.removeEventListener("mouseup", this.popupResizeUpCallback);
    console.log("PopUpResizeMouseUp");
  }
  CreateOpenBtn(){
    this.openBtn = document.createElement("div");
    this.openBtn.classList.add("open-btn");
    if(!this.popupShow)
      this.openBtn.classList.add("show");

    this.openBtn.addEventListener("mousedown", (event)=>{
      event.stopPropagation();
      
      this.openBtn.classList.remove("show");
      this.popup.classList.add("show");
      
      this.popupShow = true;
      this.SetData();
    });
    document.body.appendChild(this.openBtn);
  }

  CreateCloseBtn(){
    this.closeBtn = document.createElement("div");
    this.closeBtn.classList.add("close-btn");
    this.closeBtn.addEventListener("mousedown", (event)=>{
        event.stopPropagation();
        this.popup.classList.remove("show");
        this.openBtn.classList.add("show");
        this.popupShow = false;
        this.SetData();
    });
    this.popup.appendChild(this.closeBtn);
  }


  CreateTitle() {
    let _sectionTitle = document.createElement("div", {classList: ""});
    _sectionTitle.classList.add("popup-title-container");
    
    this.popupTitle = document.createElement("span");
    this.popupTitle.classList.add("popup-title");
    this.popupTitle.textContent = "Informazioni Risorse";

    _sectionTitle.appendChild(this.popupTitle);
    this.popup.appendChild(_sectionTitle);
  }

  CreateTabs(){
      let _sectionBody = document.createElement("div");
      _sectionBody.classList.add("popup-body-container");

      _sectionBody.appendChild(this.CreateSection("Local Storage", Object.keys(localStorage), Object.values(localStorage)));
      let _cookieKeys =  document.cookie.split(';').map((item) => {
          return item.split("=")[0]
      });
      let _cookiesValue = document.cookie.split(';').map((item) => {
        return item.split("=")[1]
      });
      _sectionBody.appendChild(this.CreateSection("Cookie", _cookieKeys, _cookiesValue));
      this.SetData();
      this.popup.appendChild(_sectionBody);
  }
  CreateSection(_title, _keys, _values){
      let _container = document.createElement("div");
      _container.classList.add("popup-section-container");

      let _tabHeader = document.createElement("div");
      _tabHeader.textContent = _title;
      _tabHeader.classList.add("popup-section-head");

      let _tabBody = document.createElement("div");
      _tabBody.classList.add("popup-section-body");
      this.BuildDataInfo(_tabBody, _keys, _values);
      this.CheckRemovedKeys(_keys);
      _container.appendChild(_tabHeader);
      _container.appendChild(_tabBody);
      return _container;
  }
  BuildDataInfo(_tabBody, _keys, _values){
    for(let i = 0; i < _keys.length; i++)
      {
          let _currentKey = _keys[i];
          let _currentValue = _values[i];
          if(this.GetDataKeys().includes(_currentKey))
             continue;

          let _containerEntity = document.createElement("div");
          _containerEntity.classList.add("data-container");
          
          let _key = document.createElement("span");
          _key.classList.add("data-key");
          _key.textContent = _currentKey;

          let _value = document.createElement("span");
          _value.classList.add("data-value");
          _value.textContent = _currentValue;
          
          if(this.previusPropertys[_currentKey] && this.previusPropertys[_currentKey] != _currentValue)
          {
              _value.classList.add("modified");
          }
          this.previusPropertys[_currentKey] = _currentValue;
          _containerEntity.appendChild(_key);
          _containerEntity.appendChild(_value);
          _tabBody.appendChild(_containerEntity);
      }
  }
  CheckRemovedKeys(_keys){
    let _previuseKey = Object.keys(this.previusPropertys);
    const _olderKeys = _previuseKey.filter(item => !_keys.includes(item));
    if(_olderKeys.length > 0)
    {
        for(let _olderKey of _olderKeys)
        {

        }
    }
  }
  GetData() {
    for (const key in this.dataSchema) {
      const val = localStorage.getItem(key);
      if (val !== null) this.dataSchema[key].set(val);
    }
  }
  
  SetData() {
    for (const key in this.dataSchema) {
      localStorage.setItem(key, this.dataSchema[key].get());
    }
  }
  GetDataKeys(){
    return Object.keys(this.dataSchema);
  }
}

let _resourcesEntity = new Resources();
console.log(_resourcesEntity);