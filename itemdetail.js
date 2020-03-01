/**
 * Copyrightⓒ2020 by Moon Hanju (github.com/it-crafts)
 * All rights reserved. 무단전재 및 재배포 금지.
 * All contents cannot be copied without permission.
 */
const common = (function() {
    const IMG_PATH = 'https://it-crafts.github.io/lesson/img';
    const fetchApiData = async (url, page = 'info') => {
        const res = await fetch(url + page);
        const data = await res.json();
        return data.data;
    }

    return { IMG_PATH, fetchApiData }
})();

const Root = (() => {
    const Root = function(selector) {
        this.$el = document.querySelector(selector);
        this._page;
    };
    const proto = Root.prototype;

    proto.create = function() {
        this._page = new ItemDetail(this.$el);
        this._page.create();
    }
    proto.destroy = function() {
        this._page && this._page.destroy();
    }

    return Root;
})();

// 이제부터 PageTurner는 이제 추상클래스가 아니라, 원본 컴포넌트의 역할을 보조해주는 독립적인 객체이다
const PageTurner = (() => {
    const PageTurner = function($loading, $more) {
        this.$loading = $loading;
        this.$more = $more;
    }
    const proto = PageTurner.prototype;

    proto.more = async function(ajaxMore) {
        this.beforeMore();
        const hasNext = await ajaxMore();
        this.afterMore(hasNext);
    }
    proto.beforeMore = function() {
        this.$more.style.display = 'none';
        this.$loading.style.display = '';
    }
    proto.afterMore = function(hasNext) {
        this.$loading.style.display = 'none';
        if(hasNext) {
            this.$more.style.display = '';
        }
    }

    return PageTurner;
})();

const AutoPageTurner = (() => {
    const AutoPageTurner = function($loading, $more) {
        PageTurner.call(this, $loading, $more);
    }
    AutoPageTurner.prototype = Object.create(PageTurner.prototype);
    AutoPageTurner.prototype.constructor = AutoPageTurner;
    const proto = AutoPageTurner.prototype;

    // PageTurner의 more 메소드가 오버라이드 됨
    proto.more = function(ajaxMore) {
        this.beforeMore();
        const io = new IntersectionObserver((entryList, observer) => {
            entryList.forEach(async entry => {
                if(!entry.isIntersecting) {
                    return;
                }
                const hasNext = await ajaxMore();
                if(!hasNext) {
                    observer.unobserve(entry.target);
                    this.afterMore(hasNext);
                }
            });
        }, { rootMargin: innerHeight + 'px' });
        io.observe(this.$loading);
    }

    return AutoPageTurner;
})();

const ItemDetail = (() => {
    const URL = 'https://my-json-server.typicode.com/it-crafts/lesson/detail/';

    const ItemDetail = function($parent) {
        this.$parent = $parent;
        this.render();
        this.$el = $parent.firstElementChild;
        this.$loading = this.$el.querySelector('.js-loading');
        this.$more = this.$el.querySelector('.js-more');

        this._item;
        this._detail;
        this._pageTurner;

        this._data = {};

        this.$click;
    }
    const proto = ItemDetail.prototype;

    proto.create = async function() {
        const detailData = await this.fetch();
        this._item = new Item(this.$el.firstElementChild, detailData, detailData.imgList, detailData.profile);
        this._item.create();
        this._detail = new Detail(this.$el.firstElementChild, detailData.detailList);
        this._detail.create();
        // ItemDetail이 PageTurner를 상속하는 게 아닌, 내부에 부하로 생성하고 일을 대신 시키기만 한다 (악보랑 악보대를 알려준다)
        this._pageTurner = new PageTurner(this.$loading, this.$more);
        this.addEvent();
    }
    proto.destroy = function() {
        this._item && this._item.destroy();
        this._detail && this._detail.destroy();
        this.removeEvent();
        this.$parent.removeChild(this.$el);
    }

    proto.click = function(e) {
        const listener = e.target.dataset.listener;
        if(listener === 'infinite') {
            // 런타임 부모 강제변경 - 이런 행위는 JS에서만 가능하며, 바람직하진 않으나 강력하다
            Object.setPrototypeOf(this._pageTurner, AutoPageTurner.prototype);
        }

        // 부하인 PageTurner 객체에게 "이거해" 라고 콜백을 넘겨준다 - 그럼 콜백 앞뒤의 일은 PageTurner가 알아서 한다
        this._pageTurner.more(async () => {
            const { hasNext } = await this._detail.addImg();
            return hasNext;
        });
    }

    proto.addEvent = function() {
        this.$click = this.click.bind(this);
        this.$more.addEventListener('click', this.$click);
    }
    proto.removeEvent = function() {
        this.$more.removeEventListener('click', this.$click);
    }

    proto.fetch = async function() {
        const detailData = await common.fetchApiData(URL, 1);
        Object.assign(this._data, detailData);
        return detailData;
    }

    proto.render = function() {
        this.$parent.innerHTML = `
            <div class="_2z6nI">
                <div style="flex-direction: column;">
                </div>
                <div class="js-more Igw0E rBNOH YBx95 ybXk5 _4EzTm soMvl" style="margin-right: 8px;">
                    <button data-listener="more" class="sqdOP L3NKy y3zKF _4pI4F" type="button" style="margin: 16px 8px">더보기</button>
                    <button data-listener="infinite" class="sqdOP L3NKy y3zKF _4pI4F" type="button" style="margin: 16px 8px">전체보기</button>
                </div>
                <div class="js-loading _4emnV" style="display: none;">
                    <div class="Igw0E IwRSH YBx95 _4EzTm _9qQ0O ZUqME" style="height: 32px; width: 32px;"><svg aria-label="읽어들이는 중..." class="By4nA" viewBox="0 0 100 100"><rect fill="#555555" height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect></svg></div>
                </div>
            </div>
        `;
    }

    return ItemDetail;
})();

const Item = (() => {
    const Item = function($parent, detailData = {}, imgDataList = [], profileData = {}) {
        this.$parent = $parent;
        this._dataList = imgDataList;
        this.render(detailData, profileData);
        this.$el = this.$parent.firstElementChild;
        this.$slider = this.$el.querySelector('.js-slider');
        this.$sliderList = this.$slider.querySelector('ul');
        this.$left = this.$el.querySelector('.js-left');
        this.$right = this.$el.querySelector('.js-right');
        this.$pagebar = this.$el.querySelector('.js-pagebar');
        // COMMENT 로직 상으로 인덱스가 조금 더 깔끔해지지 않을까 싶습니다
        this.sliderIndex = 0;
        this.$resize;
    }
    const proto = Item.prototype;

    proto.create = function() {
        this.bindEvent();
        this.click();
        this.$resize = this.resize.bind(this);
        window.addEventListener('resize', this.$resize);
    }
    proto.destroy = function() {
        /* BUG destroy 시에 this.$resize 이벤트리스너가 제거되지 않아 메모리 누수가 쌓이고 있습니다
        root.destroy() 후 리사이즈 이벤트 발생시켜 보시면, 전부 살아있는 것 확인하실 수 있습니다
        컴포넌트에서 추가되는 모든 추가로직은 대응되는 제거로직을 작성 해주시고,
        destroy에서는 추가된 모든 것들을 제거하는 로직을 붙여주세요 */
        this.$parent.removeChild(this.$el);
    }

    proto.click = function() {
        /* FIXME this 사용을 위해 화살표함수로 익명콜백을 사용하신 것 같습니다
        아래 이벤트는 어차피 컴포넌트에서 생성한 DOM 엘리먼트에 직접 걸리는 이벤트이고
        destroy와 함께 DOM트리에서 제거하므로, 눈에 보이는 문제는 없어 보입니다
        하지만 실제로 리스너가 제거되지 않기 때문에, SPA 환경에서 메모리누수가 쌓일 수 있습니다
        이벤트리스너는 가능하면 안전하게 명시적으로 해제하는 편이 좋습니다
        관련해서 이 글 읽어보시면 도움될 것 같습니다
        https://ui.toast.com/weekly-pick/ko_20160826/
        https://v8.dev/blog/tracing-js-dom */
        this.$left.addEventListener('click', () => {
            this.sliderIndex--;
            this.bindEvent();
        });
        this.$right.addEventListener('click', () => {
            this.sliderIndex++;
            this.bindEvent();
        });
    }
    /* TODO 실제 이벤트바인딩은 click에서 하고 있으므로, 아래 메소드는 비즈니스 로직에 해당합니다
    조금 더 적절한 이름으로 변경되면 더 좋을 것 같습니다 (필요시 메소드 분리도 함께 진행 해주세요) */
    proto.bindEvent = function() {
        if(this.sliderIndex === 0) {
            this.$left.style.display = "none";
        } else if(this.sliderIndex === this.$sliderList.childElementCount - 1) {
            this.$right.style.display = "none";
        } else {
            /* FIXME CSS에 종속적인 로직이며, 기본 스타일이 block이 아니게 되면 UI깨짐 가능성이 있습니다
            명시적으로 스타일제거 API 사용 또는 엘리먼트.style.스타일 = ''로 해제하면 깔끔할 것 같습니다 */
            this.$left.style.display = "block";
            this.$right.style.display = "block";
        }
        this.$slider.style.transform = `translateX(-${innerWidth * this.sliderIndex}px)`;
        /* TODO 반복문+조건문+인덱스 조합은 로직 가독성이 떨어지며, 수정시 버그유발 가능성이 높습니다
        공통로직이나 공통 컴포넌트에서는 로우한 알고리즘 사용이 더 바람직할 수 있으나
        서비스개발 시에는 오버헤드가 크지 않으므로 유지보수성이 좋은 로직이 서비스품질에 유리할 수 있습니다
        기존로직이 틀린것은 아니니, 새로 짜드린 로직도 정답은 아니니 참고만 해주세요 */
        const onClass = 'XCodT';
        const current = this.$pagebar.children[this.sliderIndex];
        [...this.$pagebar.children]
            .filter(e => e !== current) // 필요시 해당라인은 제거해도 관계없음
            .forEach(e => e.classList.remove(onClass));
        current.classList.add(onClass);
        // for(var i=0;i < this.$pagebar.childElementCount;i++) {
        //     this.$pagebar.children[i].classList.remove('XCodT');
        //     if ( i == (this.sliderIndex)) {
        //         this.$pagebar.children[i].classList.add('XCodT');
        //     }
        // }
    }
    proto.resize = function() {
        while(this.$sliderList.firstChild) {
            this.$sliderList.removeChild(this.$sliderList.firstChild);
        }
        this.$sliderList.insertAdjacentHTML('beforeend', `
            ${this.htmlSliderImgs(this._dataList)}
        `);
        this.bindEvent();
    }

    proto.htmlSliderImgs = function(imgDataList) {
        const imgs = imgDataList.reduce((html, img) => {
            html += `
                <li class="_-1_m6" style="opacity: 1; width: ${innerWidth}px;">
                    <div class="bsGjF" style="margin-left: 0px; width: ${innerWidth}px;">
                        <div class="Igw0E IwRSH eGOV_ _4EzTm" style="width: ${innerWidth}px;">
                            <div role="button" tabindex="0" class="ZyFrc">
                                <div class="eLAPa RzuR0">
                                    <div class="KL4Bh" style="padding-bottom: 100%;">
                                        <img class="FFVAD" decoding="auto" src="${common.IMG_PATH}${img}" style="object-fit: cover;">
                                    </div>
                                    <div class="_9AhH0"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            `;
            return html;
        }, '');
        return imgs;
    }
    proto.render = function(data, profileData) {
        const navs = this._dataList.reduce((html, img, index) => {
            const on = index === 0 ? 'XCodT' : '';
            html += `
                <div class="Yi5aA ${on}"></div>
            `;
            return html;
        }, '');
        this.$parent.insertAdjacentHTML('afterbegin', `
            <article class="QBXjJ M9sTE h0YNM SgTZ1 Tgarh">
                <header class="Ppjfr UE9AK wdOqh">
                    <div class="RR-M- h5uC0 mrq0Z" role="button" tabindex="0">
                        <canvas class="CfWVH" height="126" width="126" style="position: absolute; top: -5px; left: -5px; width: 42px; height: 42px;"></canvas>
                        <span class="_2dbep" role="link" tabindex="0" style="width: 32px; height: 32px;"><img alt="${profileData.name}님의 프로필 사진" class="_6q-tv" src="${common.IMG_PATH}${profileData.img}"></span>
                    </div>
                    <div class="o-MQd">
                        <div class="e1e1d">
                            <h2 class="BrX75"><a class="FPmhX notranslate nJAzx" title="${profileData.name}" href="javascript:;">${profileData.name}</a></h2>
                        </div>
                    </div>
                </header>
                <div class="_97aPb wKWK0">
                    <div class="rQDP3">
                        <div class="pR7Pc">
                            <div class="tR2pe" style="padding-bottom: 100%;"></div>
                            <div class="Igw0E IwRSH eGOV_ _4EzTm O1flK D8xaz fm1AK TxciK yiMZG">
                                <div class="tN4sQ zRsZI">
                                    <div class="NgKI_">
                                        <div class="js-slider MreMs" tabindex="0" style="transition-duration: 0.25s; transform: translateX(0px);">
                                            <div class="qqm6D">
                                                <ul class="YlNGR" style="padding-left: 0px; padding-right: 0px;">
                                                    ${this.htmlSliderImgs(this._dataList)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="js-left POSa_" tabindex="-1">
                                        <div class="coreSpriteLeftChevron"></div>
                                    </button>
                                    <button class="js-right _6CZji" tabindex="-1">
                                        <div class="coreSpriteRightChevron"></div>
                                    </button>
                                </div>
                            </div>
                            <div class="js-pagebar ijCUd _3eoV- IjCL9 _19dxx">
                                ${navs}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="eo2As">
                    <section class="ltpMr Slqrh">
                        <span class="fr66n"><button class="dCJp8 afkep"><span aria-label="좋아요" class="glyphsSpriteHeart__outline__24__grey_9 u-__7"></span></button></span>
                        <span class="_15y0l"><button class="dCJp8 afkep"><span aria-label="댓글 달기" class="glyphsSpriteComment__outline__24__grey_9 u-__7"></span></button></span>
                        <span class="_5e4p"><button class="dCJp8 afkep"><span aria-label="게시물 공유" class="glyphsSpriteDirect__outline__24__grey_9 u-__7"></span></button></span>
                        <span class="wmtNn"><button class="dCJp8 afkep"><span aria-label="저장" class="glyphsSpriteSave__outline__24__grey_9 u-__7"></span></button></span>
                    </section>
                    <section class="EDfFK ygqzn">
                        <div class=" Igw0E IwRSH eGOV_ ybXk5 vwCYk">
                            <div class="Nm9Fw"><a class="zV_Nj" href="javascript:;">좋아요 <span>${data.clipCount}</span>개</a></div>
                        </div>
                    </section>
                    <div class="KlCQn EtaWk">
                        <ul class="k59kT">
                            <div role="button" class="ZyFrc">
                                <li class="gElp9" role="menuitem">
                                    <div class="P9YgZ">
                                        <div class="C7I1f X7jCj">
                                            <div class="C4VMK">
                                                <h2 class="_6lAjh"><a class="FPmhX notranslate TlrDj" title="${profileData.name}" href="javascript:;">${profileData.name}</a></h2>
                                                <span>${data.text}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                            <li class="lnrre">
                                <button class="Z4IfV sqdOP yWX7d y3zKF" type="button">댓글 <span>${data.commentCount}</span>개 모두 보기</button>
                            </li>
                        </ul>
                    </div>
                    <section class="sH9wk _JgwE eJg28">
                        <div class="RxpZH"></div>
                    </section>
                </div>
                <div class="MEAGs">
                    <button class="dCJp8 afkep"><span aria-label="옵션 더 보기" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button>
                </div>
            </article>
        `);
    }

    return Item;
})();

const Detail = (() => {
    const Detail = function($parent, detailDataList = []) {
        this.$parent = $parent;
        this._dataListTemp = detailDataList;
        this.$elList = [];
        this._dataList = [];
    };
    const proto = Detail.prototype;

    proto.create = function() {
    }
    proto.destroy = function() {
        this.$elList.forEach($el => this.$parent.removeChild($el));
    }

    proto.addImg = function() {
        return new Promise(resolve => {
            const detailData = this._dataListTemp.shift();
            if(!detailData) {
                resolve({ hasNext: false });
            }

            this.render(detailData);
            const $el = this.$parent.lastElementChild;
            this.$elList.push($el);
            this._dataList.push(detailData);

            $el.querySelector('img').onload = (e) => {
                resolve({ hasNext: this._dataListTemp.length > 0 });
            }
        });
    }

    proto.render = function(img) {
        this.$parent.insertAdjacentHTML('beforeend', `
            <article class="M9sTE h0YNM SgTZ1">
                <img style="width: 100%; height: auto;" src="${common.IMG_PATH}${img}">
            </article>
        `);
    }

    return Detail;
})();

const root = new Root('main');
root.create();