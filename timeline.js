/**
 * Copyrightⓒ2020 by Moon Hanju (github.com/it-crafts)
 * All rights reserved. 무단전재 및 재배포 금지.
 * All contents cannot be copied without permission.
 */
(async () => {
const IMG_PATH = 'https://it-crafts.github.io/lesson/img';
const fetchApiData = async function(url, page = 'info') {
    const res = await fetch(url + page);
    const data = await res.json();
    return data.data;
}

const main = document.querySelector('main');

main.innerHTML = `
    <div class="v9tJq">
    </div>
`;
let page = main.firstElementChild;
const url = 'https://my-json-server.typicode.com/it-crafts/lesson/timeline/';
/* TODO 참조형은 정말 명확하게 특별한 이유가 없다면(선언 먼저하고 나중에 할당 한다든지..) const로 선언해주세요
일반적으론 얘네들이 재할당될 케이스가 존재하는 것 자체가 바람직하지 못한 로직입니다 */
const [infoData, timelineList] = await Promise.all([fetchApiData(url), fetchApiData(url, 1)]);
const totalPage = infoData.totalPage * 1;
const profileData = infoData.profile;
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
page.insertAdjacentHTML('afterbegin', `
    <header class="HVbuG">
        <div class="XjzKX">
            <div class="RR-M- h5uC0" role="button" tabindex="0">
                <canvas class="CfWVH" height="91" width="91" style="position: absolute; top: -7px; left: -7px; width: 91px; height: 91px;"></canvas>
                <span class="_2dbep" role="link" tabindex="0" style="width: 77px; height: 77px;"><img alt="${profileData.name}님의 프로필 사진" class="_6q-tv" src="${IMG_PATH}${profileData.img}"></span>
            </div>
        </div>
        <section class="zwlfE">
            <div class="nZSzR">
                <h1 class="_7UhW9 fKFbl yUEEX KV-D4 fDxYl">${profileData.name}</h1>
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
        <h1 class="rhpdm">${profileData.title}</h1><br><span>${profileData.text}</span>
    </div>
    <ul class="_3dEHb">
        <li class="LH36I"><span class="_81NM2">게시물 <span class="g47SY lOXF2">${profileData.post}</span></span></li>
        <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로워 <span class="g47SY lOXF2" title="${profileData.follower}">${scaleDown(profileData.follower)}</span></a></li>
        <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로우 <span class="g47SY lOXF2">${profileData.follow}</span></a></li>
    </ul>
    <div class="fx7hk">
        <a class="_9VEo1 T-jvg" href="javascript:;" data-type="grid"><span aria-label="게시물" class="glyphsSpritePhoto_grid__outline__24__blue_5 u-__7"></span></a>
        <a class="_9VEo1" href="javascript:;" data-type="feed"><span aria-label="피드" class="glyphsSpritePhoto_list__outline__24__grey_5 u-__7"></span></a>
        <a class="_9VEo1" href="javascript:;" data-type=""><span aria-label="태그됨" class="glyphsSpriteTag_up__outline__24__grey_5 u-__7"></span></a>
    </div>
`);
page.insertAdjacentHTML('beforeend', `
    <div class="_2z6nI">
        <div style="flex-direction: column;">
            <article class="FyNDV">
                <div>
                    <div style="flex-direction: column; padding-bottom: 0px; padding-top: 0px;">
                    </div>
                </div>
                <div style="display: none;" class="_4emnV">
                    <div class="Igw0E IwRSH YBx95 _4EzTm _9qQ0O ZUqME" style="height: 32px; width: 32px;"><svg aria-label="읽어들이는 중..." class="By4nA" viewBox="0 0 100 100"><rect fill="#555555" height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect></svg></div>
                </div>
                <div class="Igw0E rBNOH YBx95 ybXk5 _4EzTm soMvl" style="margin-right: 8px; display: none;">
                    <button class="sqdOP L3NKy y3zKF _4pI4F" type="button" style="margin: 16px 8px">더보기</button>
                    <button class="sqdOP L3NKy y3zKF _4pI4F" type="button" style="margin: 16px 8px">전체보기</button>
                </div>
            </article>
        </div>
    </div>
`);
// article태그 DOM트리 탐색이 반복되므로, article 변수에 담아 객체 캐싱
const article = page.querySelector('article');
let grid = article.children[0].firstElementChild;
let loading = article.children[1].firstElementChild;
let more = article.children[2].firstElementChild;
let p = 1;

const divide = function(list, size) {
    const copy = list.slice();
    const cnt = Math.floor(copy.length / size);

    const listList = [];
    for(let i = 0; i < cnt; i++) {
        listList.push(copy.splice(0, size));
    }
    return listList;
};
// 데이터 더보기 function
/* COMMENT 로직 커플링을 제거할 수 있도록 addData에 list파라미터 추가하고, 관련로직 수정했습니다
함수내부에서 함수외부의 뮤터블한 상태를 재할당 및 참조하며 로직이 반복되는 것은 지양해주세요
상태관리는 페이지 등 정말 필요한 값을 제외하면 최소화되어야 하며, 함수는 순수할 수록 좋습니다 */
const addData = function(list = []) {
    console.log('>> p: ', p);
    console.log('>> totalPage: ', totalPage);
    // TODO 큰 차이는 없지만, 본문을 먼저 렌더하고 나중에 더보기 버튼을 렌더하는 게 더 바람직할 것 같습니다
    // FIXME 더보기 버튼을 더 이상 표시하지 않는 케이스엔, 클릭 이벤트리스너를 제거 해주세요
    // 현재 p가 totalPage보다 적을때 더보기 버튼 표시
    if(p < totalPage) {
        more.parentElement.style.display = '';
    }
    const listList = divide(list, 3);
    listList.forEach(list => {
        grid.insertAdjacentHTML('beforeend', `
            <div class="Nnq7C weEfm">
            </div>
        `);
        let row = grid.lastElementChild;
    
        list.forEach(data => {
            row.insertAdjacentHTML('beforeend', `
                <div class="v1Nh3 kIKUG _bz0w">
                    <a href="javascript:;">
                        <div class="eLAPa">
                            <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="${IMG_PATH}${data.img}" style="object-fit: cover;"></div>
                        </div>
                    </a>
                </div>
            `);
        });
    });
    loading.parentElement.style.display = 'none';
};
addData(timelineList);

const clickMore = async function(e) {
    /* TODO 특정UI show/hide 로직처럼 페어인 로직은 같은 레벨에 있도록 해주세요, 가능하면 같은 함수 안에 있으면 더 좋습니다
    현재 코드는 전체코드를 전부 확인해보기 전까진 어디어디에 박혀있을 지 예측할 수가 없습니다 */
    more.parentElement.style.display = 'none';
    loading.parentElement.style.display = '';
    addData(await fetchApiData(url, ++p));
}
// 필요한 시점에 추가한 이벤트리스너 제거
more.addEventListener('click', clickMore);
// more.removeEventListener('click', clickMore);
})();