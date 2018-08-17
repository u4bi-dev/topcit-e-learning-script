/* [나의 학습현황] - [강의실 입장] 후
    - 개발자도구 Console 창에 스크립트 붙혀넣기
    - 학습 진도율 100%
*/

((max_title, max_sub, cnt_title = 1, cnt_sub = 1) => (thread = n => {

    let digit = no => no < 10 ? `0${ no }` : no,
        query = (title, sub) => `${ digit(title) }${ digit(sub) }01${ digit(sub) }`,
        url = query => `http://www.e-kpc.or.kr/eduport/front/study/progress/stdSaveProgress.jsp?sinf=${ query }`,
        tap = (...args) => console.log(...args),
        opts = {
            method : 'POST',
            headers : { 'Content-type' : 'application/x-www-form-urlencoded' }}

    for(n; n--;) (xhr = _ => (
                    tap(cnt_title, cnt_sub),
                    fetch(`${ url(query(cnt_title, cnt_sub)) }`, opts)
                        .then(e => e.blob())
                        .then(_ => max_title >= cnt_title ? xhr() : tap('done'))
                        .catch(err => tap(err)),
                    max_sub === cnt_sub ? (cnt_title++, cnt_sub = 1) : cnt_sub++
                 ))()

})(10) // multi-thread
)(20, 15) // 대단원, 소단원 (강의마다 정확히 맞출 필요 없음)