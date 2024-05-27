AOS.init({
    duration: 1000 //aos 나타나는 속도
});
$(function () {
    $('.nav>li').mouseenter(function () {
        $(this).children('.sub').stop().slideDown();
    })
    $('.nav>li').mouseleave(function () {
        $(this).children('.sub').stop().slideUp();
    })
});
$(function () {
    $('.tabcontent > div').hide();
    $('.tabnav a').click(function () {
        $('.tabcontent > div').hide().filter(this.hash).fadeIn();
        $('.tabnav a').removeClass('active');
        $(this).addClass('active');
        return false;
    }).filter(':eq(0)').click();
});

// 팝업
$(function(){
  $('.fix_bean').click(function(){
      $('.popup').fadeIn(); //fadeIn(); 서서히 나타남
  })
  $('.cancel').click(function(){
      $('.popup').fadeOut();
  })
})
// input file 커스텀 - 파일명 붙이기
const fileTarget = $('.file_box input');

fileTarget.on('change', function () {
    var files = $(this)[0].files;
    var fileArr = [];
    for (var i = 0; i < files.length; i++) {
        fileArr.push(files[i].name);
    }

    // 파일명 노출방법1: 배열 값 사이에 공백 추가
    var fileList = fileArr.join(', '); // 배열 값을 쉼표와 공백으로 연결
    $(this).siblings('.file_selected').text(fileList);
})
// 커서
const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);

function getAngle(diffX, diffY) {
  return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(
    Math.pow(diffX, 2) + Math.pow(diffY, 2)
  );
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);

  const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) + ')';
  const rotate = 'rotate(' + angle + 'deg)';
  const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll('[cursor-class]');

cursorModifiers.forEach(curosrModifier => {
  curosrModifier.addEventListener('mouseenter', function () {
    const className = this.getAttribute('cursor-class');
    cursor.classList.add(className);
  });

  curosrModifier.addEventListener('mouseleave', function () {
    const className = this.getAttribute('cursor-class');
    cursor.classList.remove(className);
  });
});