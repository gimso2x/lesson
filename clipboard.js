/**
 * Copyrightⓒ2020 by Moon Hanju (github.com/it-crafts)
 * All rights reserved. 무단전재 및 재배포 금지.
 * All contents cannot be copied without permission.
 */
(async () => {
//makeSort 
Array.prototype.makeSort = function (compareFunc) {
    let result = this;
    for (let i = 0; i < result.length; i++) {
        for (let j = i + 1; j < result.length; j++) {
            // compareFunc 있을시에 function / 동작 없을시 기본 배열 비교
            
            if (compareFunc ? compareFunc(result[j],result[i]) < 0 : result[j] > result[i]) {
                let temp = result[i];
                result[i] = result[j];
                result[j] = temp;
            }
        }
    }
    return result;
}

//makeFilter
Array.prototype.makeFilter = function (compareFunc) {
    let result = this;
    let result2 = [];
    for (let i = 0; i < result.length; i++) {
        if(compareFunc(result[i])) {
            result2.push(result[i]);
        }
    }
    return result2;
}

const common = (() => {
    const IMG_PATH = 'https://it-crafts.github.io/lesson/img';
    const fetchApiData = async (url, page = 'info') => {
        const res = await fetch(url + page);
        const data = await res.json();
        return data.data;
    }
    
    return { IMG_PATH, fetchApiData }
})();

const root = (() => {
    let $el;

    const create = () => {
        $el = document.querySelector('main');
    }

    create();
    return { $el }
})();

const timeline = await (async($parent) => {
    let $el;
    const url = 'https://my-json-server.typicode.com/it-crafts/lesson/timeline/';
    const infoData = await common.fetchApiData(url);
    const totalPage = infoData.totalPage * 1;
    const profileData = infoData.profile;

    const create = () => {
        render();
        $el = $parent.firstElementChild;
    }

    const render = () => {
        $parent.innerHTML = `
            <div class="v9tJq">
                <div class="fx7hk">
                    <a class="_9VEo1 T-jvg" href="javascript:;" data-type="grid"><span aria-label="게시물" class="glyphsSpritePhoto_grid__outline__24__grey_5 u-__7"></span></a>
                    <a class="_9VEo1" href="javascript:;" data-type="feed"><span aria-label="피드" class="glyphsSpritePhoto_list__outline__24__grey_5 u-__7"></span></a>
                    <a class="_9VEo1" href="javascript:;" data-type=""><span aria-label="태그됨" class="glyphsSpriteTag_up__outline__24__blue_5 u-__7"></span></a>
                </div>
            </div>
        `;
    }

    create();
    return { $el, totalPage, profileData, url }
})(root.$el);

const timelineProfile = (($parent, profileData) => {
    let $el;

    const create = () => {
        render(profileData);
        $el = $parent.firstElementChild;
    }

    const scaleDown = numstring => {
        const num = numstring.replace(/,/g, '');
        if(num >= 1000000) {
            return Math.floor(num / 100000) / 10 + '백만'
        }
        if(num >= 1000) {
            return Math.floor(num / 100) / 10 + '천'
        }
        return num;
    };

    const render = (data) => {
        $parent.insertAdjacentHTML('afterbegin', `
            <div>
                <header class="HVbuG">
                    <div class="XjzKX">
                        <div class="RR-M- h5uC0" role="button" tabindex="0">
                            <canvas class="CfWVH" height="91" width="91" style="position: absolute; top: -7px; left: -7px; width: 91px; height: 91px;"></canvas>
                            <span class="_2dbep" role="link" tabindex="0" style="width: 77px; height: 77px;"><img alt="${data.name}님의 프로필 사진" class="_6q-tv" src="${common.IMG_PATH}${data.img}"></span>
                        </div>
                    </div>
                    <section class="zwlfE">
                        <div class="nZSzR">
                            <h1 class="_7UhW9 fKFbl yUEEX KV-D4 fDxYl">${data.name}</h1>
                            <span class="mrEK_ Szr5J coreSpriteVerifiedBadge" title="인증됨">인증됨</span>
                            <div class="AFWDX"><button class="dCJp8 afkep"><span aria-label="옵션" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button></div>
                        </div>
                        <div class="Y2E37">
                            <div class="Igw0E IwRSH eGOV_ vwCYk">
                                <span class="ffKix bqE32">
                                    <span class="vBF20 _1OSdk"><button class="_5f5mN jIbKX _6VtSN yZn4P">팔로우</button></span>
                                    <span class="mLCHD _1OSdk"><button class="_5f5mN jIbKX KUBKM yZn4P"><div class="OfoBO"><div class="_5fEvj coreSpriteDropdownArrowWhite"></div></div></button></span>
                                </span>
                            </div>
                        </div>
                    </section>
                </header>
                <div class="-vDIg">
                    <h1 class="rhpdm">${data.title}</h1><br><span>${data.text}</span>
                </div>
                <ul class="_3dEHb">
                    <li class="LH36I"><span class="_81NM2">게시물 <span class="g47SY lOXF2">${data.post}</span></span></li>
                    <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로워 <span class="g47SY lOXF2" title="${data.follower}">${scaleDown(data.follower)}</span></a></li>
                    <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로우 <span class="g47SY lOXF2">${data.follow}</span></a></li>
                </ul>
            </div>
        `);
    }

    create();
    return { $el }
})(timeline.$el, timeline.profileData);

const timelineContent = (($parent) => {
    let $el;

    const create = () => {
        render();
        $el = $parent.lastElementChild;
    }

    const render = () => {
        $parent.insertAdjacentHTML('beforeend', `
            <div class="_2z6nI">
                <div style="flex-direction: column;">
                </div>
            </div>
        `);
    }

    create();
    return { $el }
})(timeline.$el);

const grid = await (async ($parent, url) => {
    let $el;

    let page = 1;
    const ITEM_PER_ROW = 3;
    const timelineList = await common.fetchApiData(url, page++);

    const create = () => {
        render();
        $el = $parent.lastElementChild;
        // 최신순, 인기순, 서치버튼 버튼요소 지정
        $latestBtn = $el.firstElementChild.firstElementChild;
        $popularBtn = $el.firstElementChild.children[1];
        $searchInput = $el.firstElementChild.lastElementChild.querySelector('input[type="search"]');
    }

    const divide = (list, size) => {
        const copy = [...list];
        const cnt = Math.ceil(copy.length / size);
    
        const listList = [];
        for(let i = 0; i < cnt; i++) {
            listList.push(copy.splice(0, size));
        }

        const lastlist = listList[listList.length - 1];
        for(let i = lastlist.length; i < size; i++) {
            lastlist[i] = {};
        }
        
        return listList;
    };
    const listList = divide(timelineList, ITEM_PER_ROW);

    const filter = () => {
        $el.lastElementChild.firstElementChild.innerHTML = '';
        // filter 계산식
        // const filterList = timelineList.filter(a => {
        //     return (a.name + a.text).includes($searchInput.value);
        // });
        // filter 직접 구현
        const filterList = timelineList.makeFilter(a => {
            return (a.name + a.text).includes($searchInput.value);
        });
        if(filterList.length) {
            divide(filterList, ITEM_PER_ROW)
                .forEach(list => {
                        sliceGridItems(list);
                    
                });
        }
    }

    const comparator = (() => {
        const popularCal = (a, b) => a * 1 + b * 2;
        return {
            popular: (a, b) => popularCal(b.clipCount, b.commentCount) - popularCal(a.clipCount, a.commentCount),
            latest: (a, b) =>  Date.parse(b.timestamp) - Date.parse(a.timestamp),
        }
    })();
    const sort = (type) => {
        $el.lastElementChild.firstElementChild.innerHTML = '';
        // 버튼 클릭시 input value 초기화
        $searchInput.value = '';
        timelineList.makeSort(comparator[type]);
        divide(timelineList, ITEM_PER_ROW)
            .forEach(list => {
                sliceGridItems(list);
            });
    }

    const render = () => {
        $parent.insertAdjacentHTML('beforeend', `
            <article class="FyNDV">
                <div class="Igw0E rBNOH YBx95 ybXk5 _4EzTm soMvl JI_ht bkEs3 DhRcB">
                    <button class="sqdOP L3NKy y3zKF JI_ht" type="button" data-kind="latest">최신순</button>
                    <button class="sqdOP L3NKy y3zKF JI_ht" type="button" data-kind="popular">인기순</button>
                    <h1 class="K3Sf1">
                        <div class="Igw0E rBNOH eGOV_ ybXk5 _4EzTm">
                            <div class="Igw0E IwRSH eGOV_ vwCYk">
                                <div class="Igw0E IwRSH eGOV_ ybXk5 _4EzTm">
                                    <div class="Igw0E IwRSH eGOV_ vwCYk">
                                        <label class="NcCcD">
                                            <input autocapitalize="none" autocomplete="off" class="j_2Hd iwQA6 RO68f M5V28" placeholder="검색" spellcheck="true" type="search" value="" />
                                            <div class="DWAFP">
                                                <div class="Igw0E IwRSH eGOV_ _4EzTm">
                                                    <span aria-label="검색" class="glyphsSpriteSearch u-__7"></span>
                                                </div>
                                                <span class="rwQu7">검색</span>
                                            </div>
                                            <div class="Igw0E rBNOH YBx95 _4EzTm ItkAi O1flK fm1AK TxciK yiMZG"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </h1>
                </div>
                <div>
                    <div style="flex-direction: column; padding-bottom: 0px; padding-top: 0px;">
                    </div>
                </div>
            </article>
        `);
    }

    // bindEvent 정의
    const bindEvent = () => {
        $el.firstElementChild.addEventListener('click', click);
        
        $searchInput.addEventListener('keyup', () => {
            filter();
        });
    }

    const click = (e) => {
        const kind = e.target.dataset.kind; 
        if(!kind) {
            return;
        }
        sort(kind);
    }

    create();
    bindEvent();
    return { $el, listList }
})(timelineContent.$el.firstElementChild, timeline.url);

// sort나 filter시에 리스트 재정렬위해 function으로 묶음
const sliceGridItems = (list) => {
    const gridItem = (($parent, list) => {
        let $el;

        const create = () => {
            render(list);
            $el = $parent.lastElementChild;
        }

        const render = (list) => {
            const html = list.reduce((html, data) => {
                const img = (data.img || '') && `
                    <a href="javascript:;">
                        <div class="eLAPa">
                            <div class="KL4Bh">
                                <img class="FFVAD" decoding="auto" src="${common.IMG_PATH}${data.img}" style="object-fit: cover;">
                            </div>
                        </div>
                    </a>
                `;
                html += `
                    <div class="v1Nh3 kIKUG _bz0w">${img}</div>
                `;
                return html;
            }, '');
            
            $parent.insertAdjacentHTML('beforeend', `
                <div class="Nnq7C weEfm">
                    ${html}
                </div>
            `);
        }
    
        create();
        return { $el }
    })(grid.$el.lastElementChild.firstElementChild, list);
}

//최초 로드시
grid.listList.forEach(list => {
    sliceGridItems(list);
});

})();