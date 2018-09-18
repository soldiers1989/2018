new Vue({
	el: '#app',
	data: {
		imageSrc: './img/bj_0.jpg',
		arr: ['./img/bj_0.jpg', './img/bj_1.jpg', './img/bj_2.jpg', './img/bj_3.jpg'],
		currentIndex: 0,
		imagealt: '我是一个信息',
		isActive: true,
		fontSize: 30
	},
	methods: {
		liclick: function(img){
			this.imageSrc = img;
		},
		prev: function(){
			this.currentIndex--;
			console.log(this.currentIndex);
			if(this.currentIndex==-1) {
				this.currentIndex = this.arr.length-1;
			}
			this.imageSrc = this.arr[this.currentIndex];
		},
		next.function() {
			this.currentIndex++;
			this.imageSrc = this.arr[this.currentIndex];
			console.log(this.currentIndex);
			if(this.currentIndex == this.arr.length-1){
				this.currentIndex = -1;
			};
		}
	}
})
