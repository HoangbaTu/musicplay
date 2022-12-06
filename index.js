const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// const activity = $('.activity');

const PLAYER_STORAGE_KEY = 'F8_PLAYER';

const like = $('.btn-heart');
const player = $('.player');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play')
const progress = $('#progress');
const progressVolume = $('#progressVolume');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playlist = $('.playlist');

const totalTime = $('.totalTime');
const currentTime = $('.currentTime')
const volumeCurrent = $('.volumeCurrent');
const app = {
    arrSongs: [],
    currentIndex: 0,
    isLike: false,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [

        {//1
            name: 'Solo',
            singer: 'Jennie',
            path: './asset/music/solojeni.mp3',
            image: './asset/img/solo.jpg'
        },
        {//2
            name: 'Một Bước Yêu Vạn Dặm Đau',
            singer: 'MR Siro',
            path: './asset/music/1buocyeu.mp3',
            image: './asset/img/1buocyeu1.jpg'
        },
        {//3
            name: 'Hãy Trao Cho Anh',
            singer: 'Sơn Tùng MTP',
            path: './asset/music/st1.mp3',
            image: './asset/img/ht.jpg'
        },
        {//4
            name: 'Yêu Là Cưới',
            singer: 'Phát Hồ - X2X',
            path: './asset/music/Yeu-La-Cuoi-Phat-Ho-X2X.mp3',
            image: './asset/img/yeulacuoi.jpg'
        },
        {//5
            name: 'Waiting For You',
            singer: 'MONO',
            path: './asset/music/mono.mp3',
            image: './asset/img/mono.jpg'
        },
        {//6
            name: 'Nói Hoặc Không Nói',
            singer: 'AMEE',
            path: './asset/music/noihoackhongnoi.mp3',
            image: './asset/img/amee.jpg'
        },
        {//7
            name: 'Mang Tiền Về Cho Mẹ',
            singer: 'Đen Vâu',
            path: './asset/music/mangtienvechome.mp3',
            image: './asset/img/den50.jpg'
        },
        {//8
            name: 'Nơi Ấy Con Tìm Về',
            singer: 'Hồ Quang Hiếu',
            path: './asset/music/Noiaycontimve.mp3',
            image: './asset/img/noiaycontimve.jpg'
        },
        {//9
            name: 'Thanh Xuân',
            singer: 'Da LAB',
            path: './asset/music/thanhxuan.mp3',
            image: './asset/img/tx.jpg'
        },
        {//10
            name: 'Hết Thương Cạn Nhớ',
            singer: 'Đức Phúc',
            path: './asset/music/ducphuc.mp3',
            image: './asset/img/dp.jpg'
        },
        {//11
            name: 'Chuyện Đôi Ta',
            singer: 'Emcee L',
            path: './asset/music/chuyendoita.mp3',
            image: './asset/img/chuyendoita.jpg'
        },
        {//12
            name: 'Cho Em Một Lần Yêu Remix',
            singer: 'Đông Nhi',
            path: './asset/music/nguoiden.mp3',
            image: './asset/img/dongnhi.jpg'
        },
        {//13
            name: 'Đường Tôi Chở Em Về',
            singer: 'Bùi Trương Linh ',
            path: './asset/music/duongtoichoeve.mp3',
            image: './asset/img/duongtoi.jpg'
        },
        {//14
            name: 'Đi Về Nhà',
            singer: 'Đen x JustaTee ',
            path: './asset/music/divenha.mp3',
            image: './asset/img/den50.jpg'
        },
         {//15
            name: 'Hoa Nở Không Màu',
            singer: 'Hoài Lâm ',
            path: './asset/music/hoanokmau.mp3',
            image: './asset/img/hoailam.jpg'
        },
          {//16
            name: 'Suýt Nữa Thì',
            singer: 'ANDIEZ ',
            path: './asset/music/suytnuathi.mp3',
            image: './asset/img/suytnuathi.jpg'
        },
         {//17
            name: 'Shape Of You',
            singer: 'Ed Sheeran ',
            path: './asset/music/shapeofyou.mp3',
            image: './asset/img/shapeofyou.jpg'
        },
         {//18
            name: 'Em Gái Mưa',
            singer: 'Hương Tràm ',
            path: './asset/music/emgaimua.mp3',
            image: './asset/img/emgaimua.jpg'
        },
         {//19
            name: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh',
            singer: ' Ái Phương  ',
            path: './asset/music/toi.mp3',
            image: './asset/img/toithay.jpg'
        },
         {//20
            name: 'Chân Tình Cover',
            singer: 'Thái Eng - Thắng Nguyễn ',
            path: './asset/music/chantinh.mp3',
            image: './asset/img/chantinh.jpg'
        },
    ],
    

    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    // 1.Hàm render ra bài hát
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },

    //Hàm handleEvent

    handleEvents: function() {
        const _this = this;

        // Xử lý thích /bỏ thích bài hát
        like.onclick = function() {
            if (like.classList.contains('liking') === false) {
                like.classList.add('liking');
            } else like.classList.remove('liking');
        }

        // 2.Xử lý quay CD
        const cdThumAnimate = cdThumb.animate(
            [{ transform: 'rotate(360deg)' }], {
                duration: 20000, //20s
                iterations: Infinity
            })
        cdThumAnimate.pause();

        // Xử lý phóng to/thu nhỏ CD
        const cdWidth = cd.offsetWidth;
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // 3.Xử lý khi click Play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi song được play
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumAnimate.play();
        }

        //Khi pause bài hát
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumAnimate.pause();
        }

        // Xử lý tiến độ bài hát
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
            _this.timeCurrent()
            _this.timeDuration()
        }


        // Xử lý khi tua bài hát
        progress.oninput = function(e) {
            const seekTime = audio.duration * e.target.value / 100;
            audio.currentTime = seekTime;
        }

        // *** Xử lý âm thanh audio
        progressVolume.oninput = function(e) {
            
            const seekVolume = (e.target.value / 100);
            audio.volume = seekVolume;
            volumeCurrent.textContent = `${seekVolume*100}%`

        }


        // 4. Xử lý điều khiển bài hát trước / sau / random

        //  next song 
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else _this.nextSong();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        //  prev song 
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else _this.prevSong();
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        //  Xử lý bật/ tắt random song 
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // 4. Xủ lý next khi hết bài hát
        audio.onended = function() {
            // if (_this.isRandom) {
            //     _this.playRandomSong();
            // } else _this.nextSong();
            // audio.play();

            if (!_this.isRepeat) {
                nextBtn.click();
            } else {
                audio.play();
            }
        }

        // 5. Xử lý bật / tắt phát lại bài hiện tại 
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)');

            if (songNode || e.target.closest('.option')) {

                // Xử lý khi click vào song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                //  Xử lý khi click vào song option
                if (e.target.closest('.option')) {
                    console.log('option');

                }
            }

        }
    },

    // Lấy bài hát đầu tiên
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path;
    },

    //  Load config
    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    // Bài hát tiếp theo
    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    // Bài hát phía sau
    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    // Random song
    playRandomSong: function() {
        app.arrSongs.push(this.currentIndex);
        if (this.arrSongs.length === this.songs.length) {
            this.arrSongs = [];
        }
        let newIndex;

        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        }
        while (app.arrSongs.includes(newIndex));

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    // View active song
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                // inline: 'center',
            })
        }, 300)
    },

    formatTime: function(sec_num) {
        let hours = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - hours * 3600) / 60);
        let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);

        hours = hours < 10 ? (hours > 0 ? '0' + hours : 0) : hours;

        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        return (hours !== 0 ? hours + ':' : '') + minutes + ':' + seconds;
    },
    // hiển thị thời gian bài hát hiện tại
    timeCurrent: function() {
        setInterval(() => {
            let cur = this.formatTime(audio.currentTime)
            currentTime.textContent = `${cur}`;
        }, 100)
    },
    //hiển thị thời gian bài hát
    timeDuration: function() {
        if (audio.duration) {
            let dur = this.formatTime(audio.duration)
            totalTime.textContent = `${dur}`;
        }
    },

    start: function() {

        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();

        // Định nghĩa các thuộc tính cho Object
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện DOM- Events
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi bắt đầu chạy
        this.loadCurrentSong();

        // Render ra các bài hát Playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button repeat và random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
    }
}
app.start();