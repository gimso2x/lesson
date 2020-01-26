const main = document.querySelector('main');
// page 엘리먼트에 해당하는 래퍼 div만 남기고, 헤더영역과 콘텐츠영역으로 마크업 분리
// 기준은 API에서 내려오는 데이터를 기본으로 하되, 필요시 UI도 적절히 고려하여 설계
main.innerHTML = /*html*/`
    <div class="v9tJq VfzDr">
    </div>
`;
let page = main.firstElementChild;
// 템플릿리터럴의 HTML코드를 파싱하여 DOM 생성, first 자식으로 엘리먼트 추가 (prepend)
page.insertAdjacentHTML('afterbegin', /*html*/`
    <header class=" HVbuG">
        <div class="XjzKX">
            <div class="RR-M- h5uC0" role="button" tabindex="0">
                <canvas class="CfWVH" height="91" width="91" style="position: absolute; top: -7px; left: -7px; width: 91px; height: 91px;"></canvas>
                <span class="_2dbep" role="link" tabindex="0" style="width: 77px; height: 77px;"><img alt="twicetagram님의 프로필 사진" class="_6q-tv" src="https://it-crafts.github.io/lesson/img/profile.jpg"></span>
            </div>
        </div>
        <section class="zwlfE">
            <div class="nZSzR">
                <h1 class="_7UhW9 fKFbl yUEEX KV-D4 fDxYl">twicetagram</h1>
                <span class="mrEK_ Szr5J coreSpriteVerifiedBadge" title="인증됨">인증됨</span>
                <div class="AFWDX"><button class="dCJp8 afkep"><span aria-label="옵션" class="glyphsSpriteMore_horizontal__outline__24__grey_9 u-__7"></span></button></div>
            </div>
            <div class="Y2E37">
                <div class=" Igw0E IwRSH eGOV_ vwCYk">
                    <span class=" ffKix bqE32">
                        <span class="vBF20 _1OSdk"><button class="_5f5mN jIbKX _6VtSN yZn4P">팔로우</button></span>
                        <span class="mLCHD _1OSdk"><button class="_5f5mN jIbKX KUBKM yZn4P"><div class="OfoBO"><div class="_5fEvj coreSpriteDropdownArrowWhite"></div></div></button></span>
                    </span>
                </div>
            </div>
        </section>
    </header>
    <div class="-vDIg">
        <h1 class="rhpdm">TWICE</h1><br><span>TWICE OFFICIAL INSTAGRAM<br>^-^</span>
    </div>
    <ul class="_3dEHb">
        <li class="LH36I"><span class="_81NM2">게시물 <span class="g47SY lOXF2">2,010</span></span></li>
        <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로워 <span class="g47SY lOXF2" title="11,543,431">11.5백만</span></a></li>
        <li class="LH36I"><a class="_81NM2" href="javascript:;">팔로우 <span class="g47SY lOXF2">25</span></a></li></ul>
    </ul>
    <div class="fx7hk">
        <a class="_9VEo1 T-jvg" href="javascript:;" data-type="grid"><span aria-label="게시물" class="glyphsSpritePhoto_grid__outline__24__blue_5 u-__7"></span></a>
        <a class="_9VEo1" href="javascript:;" data-type="feed"><span aria-label="피드" class="glyphsSpritePhoto_list__outline__24__grey_5 u-__7"></span></a>
        <a class="_9VEo1" href="javascript:;" data-type=""><span aria-label="태그됨" class="glyphsSpriteTag_up__outline__24__grey_5 u-__7"></span></a>
    </div>
`);
// 템플릿리터럴의 HTML코드를 파싱하여 DOM 생성, last 자식으로 엘리먼트 추가 (append)
page.insertAdjacentHTML('beforeend', /*html*/`
    <div class="_2z6nI">
        <div style="flex-direction: column;">
            <article class="FyNDV">
                <div>
                    <div style="flex-direction: column; padding-bottom: 0px; padding-top: 0px;">
                        <div class="Nnq7C weEfm">
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/01.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/02.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/03.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="Nnq7C weEfm">
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/04.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/05.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/06.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="Nnq7C weEfm">
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/07.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/08.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/09.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="Nnq7C weEfm">
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/10.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/11.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                            <div class="v1Nh3 kIKUG _bz0w">
                                <a href="javascript:;">
                                    <div class="eLAPa">
                                        <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="https://it-crafts.github.io/lesson/img/06.jpg" style="object-fit: cover;"></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="/*visibility: hidden;*/" class="_4emnV">
                    <div class="Igw0E IwRSH YBx95 _4EzTm _9qQ0O ZUqME" style="height: 32px; width: 32px;"><svg aria-label="읽어들이는 중..." class="By4nA" viewBox="0 0 100 100"><rect fill="#555555" height="6" opacity="0" rx="3" ry="3" transform="rotate(-90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.08333333333333333" rx="3" ry="3" transform="rotate(-60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.16666666666666666" rx="3" ry="3" transform="rotate(-30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.25" rx="3" ry="3" transform="rotate(0 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.3333333333333333" rx="3" ry="3" transform="rotate(30 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.4166666666666667" rx="3" ry="3" transform="rotate(60 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5" rx="3" ry="3" transform="rotate(90 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.5833333333333334" rx="3" ry="3" transform="rotate(120 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.6666666666666666" rx="3" ry="3" transform="rotate(150 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.75" rx="3" ry="3" transform="rotate(180 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.8333333333333334" rx="3" ry="3" transform="rotate(210 50 50)" width="25" x="72" y="47"></rect><rect fill="#555555" height="6" opacity="0.9166666666666666" rx="3" ry="3" transform="rotate(240 50 50)" width="25" x="72" y="47"></rect></svg></div>
                </div>
            </article>
        </div>
    </div>
`);