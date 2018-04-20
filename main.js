(function() {
	var bgImage = new Image(),
		bikeAtlas = new Image(),
		vh = window.innerHeight;

	var Platform = {
		mobile: window.matchMedia("(max-width: 768px)"),
		tablet: window.matchMedia("(min-width: 768px) and (max-width: 1024px)"),
		desktop: window.matchMedia(
			"(min-width: 1024px) and (max-width: 1440px)"
		),
		largeDesktop: window.matchMedia("(min-width: 1440px")
	};

	var Util = {
		getBackgroundImage: function() {
			var platform = "desktop";

			for (var pltfrm in Platform) {
				if (Platform[pltfrm].matches) {
					Game.platform = platform = pltfrm;
					break;
				}
			}

			return Terrain.images[platform];
		},

		getScale: function(originalValue, currentValue) {
			return (
				(originalValue > currentValue ? -1 : 1) *
				(Math.min(originalValue, currentValue) /
					Math.max(originalValue, currentValue))
			);
		},

		randomize: function(array) {
			var currentIndex = array.length,
				temporaryValue,
				randomIndex;

			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		},

		pad(num, size) {
			var s = "0000" + num;
			return s.substr(s.length - size);
		},

		formatTime(time) {
			var h = (m = s = ms = 0);
			var newTime = "";

			h = Math.floor(time / (60 * 60 * 1000));
			time = time % (60 * 60 * 1000);
			m = Math.floor(time / (60 * 1000));
			time = time % (60 * 1000);
			s = Math.floor(time / 1000);
			ms = time % 1000;

			newTime =
				Util.pad(h, 2) +
				":" +
				Util.pad(m, 2) +
				":" +
				Util.pad(s, 2) +
				":" +
				Util.pad(ms, 3);
			return newTime;
		}
	};

	var Bike = {
		image: "./assets/images/bikes.png",

		position: [0, 0],

		positions: {
			mobile: [0, 0.0029],
			tablet: [0.47011, 0.0038],
			desktop: [0, 0.0045],
			largeDesktop: [0, 0.0045]
		},

		rider: [
			{
				name: "C S Santhosh",
				image: {
					normal: [-112, 0],
					left: [0, 0],
					right: [-230, 0]
				}
			},
			{
				name: "Oriel Meena",
				image: {
					normal: [-623, 0],
					left: [-517, 0],
					right: [-733, 0]
				}
			}
		],

		paths: {
			mobile: [
				{
					delay: 1,
					duration: 2,
					displacement: 0.25,
					direction: "left"
				},
				{
					delay: 1.5,
					duration: 2,
					displacement: 0.05,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 0.5,
					duration: 2,
					displacement: 0.102,
					direction: "right"
				},
				{ direction: "normal" },
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 2,
					duration: 2,
					displacement: 0.05,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 1,
					duration: 2,
					displacement: 0.05,
					direction: "right"
				},
				{ direction: "normal" },
				{ direction: "normal" }
			],
			tablet: [
				{ delay: 1, duration: 2, displacement: 0.1, direction: "left" },
				{
					delay: 1.8,
					duration: 2,
					displacement: 0.05,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 1,
					duration: 2,
					displacement: 0.102,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.05,
					direction: "left"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 2,
					duration: 2,
					displacement: 0.005,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 1.5,
					duration: 2,
					displacement: 0.05,
					direction: "right"
				},
				{ direction: "normal" },
				{ direction: "normal" }
			],
			desktop: [
				{
					delay: 0.5,
					duration: 2,
					displacement: 0.1,
					direction: "left"
				},
				{
					delay: 1.8,
					duration: 2,
					displacement: 0.05,
					direction: "right"
				},
				{
					delay: 0.8,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 1,
					duration: 2,
					displacement: 0.02,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.05,
					direction: "left"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 2.5,
					duration: 2,
					displacement: 0.002,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 1.5,
					duration: 2,
					displacement: 0.05,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.05,
					direction: "left"
				},
				{ direction: "normal" }
			],
			largeDesktop: [
				{
					delay: 0.5,
					duration: 2,
					displacement: 0.1,
					direction: "left"
				}, //1
				{
					delay: 1.8,
					duration: 2,
					displacement: 0.05,
					direction: "right"
				},
				{
					delay: 0.8,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 1,
					duration: 2,
					displacement: 0.02,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.05,
					direction: "left"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 2.5,
					duration: 2,
					displacement: 0.002,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.102,
					direction: "left"
				},
				{
					delay: 1.5,
					duration: 2,
					displacement: 0.05,
					direction: "right"
				},
				{
					delay: 1.3,
					duration: 2,
					displacement: 0.05,
					direction: "left"
				},
				{ direction: "normal" }
			]
		},

		container: document.createElement("div"),

		selectedRider: 1,

		orientation: "normal",

		displacementX: 0,

		getStartPosition: function() {
			return [0, Bike.positions[Game.platform][1] * bgImage.clientHeight];
		},

		setToNormal: function() {
			var bike = Bike.container;
			Bike.orientation = "normal";

			bike.style.background =
				"url(" +
				Bike.image +
				") " +
				Bike.rider[Bike.selectedRider].image[Bike.orientation][0] +
				"px " +
				Bike.rider[Bike.selectedRider].image[Bike.orientation][1] +
				"px";
		},

		turn: function(displacement, direction, delay) {
			Bike.position = [
				direction === "left"
					? -(displacement * bgImage.clientWidth)
					: displacement * bgImage.clientWidth,
				0
			];
			TweenMax.to(Bike.container, 1.5, {
				delay: delay,
				css: {
					transform:
						"scale(" +
						bgImage.clientHeight / 49047 +
						") translate(" +
						Bike.position[0] +
						"px, " +
						Bike.position[1] +
						"px)"
				},
				onComplete: Bike.setToNormal,
				onStart: function() {
					var bikeContainer = Bike.container;
					bikeContainer.style.background =
						"url(" +
						Bike.image +
						") " +
						Bike.rider[Bike.selectedRider].image[direction][0] +
						"px " +
						Bike.rider[Bike.selectedRider].image[direction][1] +
						"px";
				}
			});
		},

		moveToFinish: function() {
			TweenMax.to(".bike", 3, {
				ease: Power1.easeInOut,
				css: { top: "100px" }
			});
		},

		renderOnStartPosition: function() {
			var startPos = Bike.getStartPosition();
			Bike.position = [startPos[0], startPos[1]];
			var bike = Bike.container;

			bike.style.background =
				"url(" +
				Bike.image +
				") " +
				Bike.rider[Bike.selectedRider].image[Bike.orientation][0] +
				"px " +
				Bike.rider[Bike.selectedRider].image[Bike.orientation][1] +
				"px";
			bike.style.bottom = Bike.position[1] + "px";
			bike.className = "bike";
			bike.style.width = "121px";
			bike.style.height = "188px";
			bike.style.transform =
				"scale(" + bgImage.clientHeight / 49047 + ")";
			if (Game.platform === "mobile") {
				bike.style.left = "38%";
			}
			Game.arena.appendChild(bike);
		},

		render: function() {
			if (Game.background) {
				Bike.renderOnStartPosition();
			} else {
				setTimeout(Bike.render, 100);
			}
		}
	};

	var Terrain = {
		images: {
			largeDesktop: "./assets/images/race_background_large_desktop.jpg",
			desktop: "./assets/images/race_background_desktop.jpg",
			mobile: "./assets/images/race_background_mobile.jpg",
			tablet: "./assets/images/race_background_tablet.jpg"
		},

		easeAnimation: Power1.easeInOut,

		step: 0,

		position: 0,

		scale: 1,

		render: function() {
			Game.arena.appendChild(bgImage);

			Terrain.scale = Util.getScale(
				bgImage.naturalHeight,
				bgImage.clientHeight
			);
			Terrain.step = bgImage.clientHeight / 11;

			var startPos = -(bgImage.height - vh);
			Terrain.position = startPos;
			bgImage.style.transform = "translate(0px, " + startPos + "px)";
			Game.status = "countingDown";
			Timer.show();
			setTimeout(Timer.showCountdown, 1000);
		}
	};

	var Stopwatch = function() {
		var startAt = 0;
		var lapTime = 0;

		var now = function() {
			return new Date().getTime();
		};

		this.start = function() {
			startAt = startAt ? startAt : now();
		};

		this.stop = function() {
			lapTime = startAt ? lapTime + now() - startAt : lapTime;
			startAt = 0;
		};

		this.reset = function() {
			lapTime = startAt = 0;
		};

		this.add = function() {
			lapTime += 30000;
		}

		this.time = function() {
			return lapTime + (startAt ? now() - startAt : 0);
		};
	};

	var stopwatch = new Stopwatch();

	var Timer = {
		time: {
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0
		},

		container: document.querySelector(".timer-counter"),

		timeoutHandle: null,

		show: function() {
			TweenMax.to(".timer-wrap", 0.5, {
				autoAlpha: 1,
				display: "block",
				delay: 0.5
			});
		},

		showCountdown: function() {
			var timer = Timer.container;
			timer.textContent = 3;

			function change(i) {
				return function() {
					timer.textContent =
						i !== 0 ? (i !== 1 ? i - 1 : "GO!") : "";
					if (i === 0) {
						Game.run();
					}
				};
			}

			for (var i = 3; i >= 0; i--) {
				var changeFunction = change(i);
				setTimeout(changeFunction, (3 - (i - 1)) * 1000);
			}
			var timerTween = new TimelineLite({ paused: true });
			timerTween
				.from(".timer-counter", 0.5, { opacity: 0, scale: 0.5 })
				.to(".timer-part-sides", 0.5, {
					backgroundPosition: "0px 0",
					ease: Linear.easeNone
				})
				.to(".timer-copy", 0.5, {
					opacity: 1,
					scale: 1,
					ease: Back.easeOut
				});
			timerTween.play();
		},

		add: function(penalty) {
			var seconds = Timer.time.seconds;
			var minutes = Timer.time.minutes;
			var hours = Timer.time.hours;
			if (!penalty) {
				seconds++;
			} else {
				Timer.penalty();
				seconds += 30;
			}
			if (seconds >= 60) {
				seconds = seconds % 60;
				minutes++;
				if (minutes >= 60) {
					minutes = 0;
					hours++;
				}
			}
			Timer.time = {
				seconds: seconds,
				minutes: minutes,
				hours: hours
			};
			Timer.container.textContent = Timer.getTime();
			if (Game.status === "pausedForQuestion") {
				Timer.timeoutHandle = setTimeout(Timer.add, 1000);
			}
		},

		penalty: function() {
			var penaltyTween = new TimelineLite();
			penaltyTween
				.to(".penalty", 0.5, {
					opacity: 1,
					scale: 1,
					ease: Bounce.easeOut
				})
				.to(".penalty", 1, { opacity: 0, y: -40, delay: 0.3 });
			TweenMax.set(".penalty", { clearProps: "all" });
		},

		getTime: function() {
			var seconds = Timer.time.seconds;
			var minutes = Timer.time.minutes;
			var hours = Timer.time.hours;
			return (
				(hours ? (hours > 9 ? hours : "0" + hours) : "00") +
				":" +
				(minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
				":" +
				(seconds > 9 ? seconds : "0" + seconds)
			);
		},

		reset: function() {
			Timer.time = 0;
		},

		start: function() {
			Timer.intervalHandle = setInterval(Timer.update, 1);
			stopwatch.start();
		},

		stop: function() {
			stopwatch.stop();
			clearInterval(Timer.intervalHandle);
		},

		update: function() {
			Timer.container.textContent = Util.formatTime(stopwatch.time());
		},

		addPenalty: function() {
			stopwatch.add();
			Timer.update();
			Timer.penalty();
		}
	};

	var Game = {
		rider: "",

		userData: {},

		arena: document.getElementById("game"),

		background: false,

		bike: false,

		level: 0,

		checkpoints: 0,

		questions: [],

		platform: "desktop",

		error: {
			questions: false,
			terrain: false,
			bike: false,
			submit: false,
			updateAnswer: []
		},

		restartAttempts: 0,

		status: "loading",

		loading: function() {
			var container = document.querySelector(".loading");
			var text = container.textContent;
			var dotsCount = text.match(/\./g).length;
			if (Game.status === "loading") {
				setTimeout(function() {
					text = dotsCount !== 3 ? text + "." : "Loading.";
					container.textContent = text;
					Game.loading();
				}, 1000);
			}
		},

		fetchQuestions: function() {
			Data.fetch("/userData").then(
				function(response) {
					Game.userData = response.userInfo.shift();
					Game.questions = Util.randomize(response.userInfo);
					Game.selectRider(Game.userData.riderName);

					document.querySelector(".player-name").textContent =
						Game.userData.userName;
				},
				function(err) {
					Game.error.questions = true;
					/** TODO: Handle error */
				}
			);
		},

		run: function() {
			if (
				!Game.error.questions &&
				!Game.error.terrain &&
				!Game.error.bike
			) {
				Timer.container.textContent = "00:00:00";
				Game.status = "running";
				Game.firstLevel();
			} else {
				if (Game.restartAttempts < 10) {
					setTimeout(Game.run, 1000);
				} else {
					/** TODO: Handle errors */
				}
			}
		},

		checkAnswer: function(answer) {
			if (answer) {
				setTimeout(Timer.end, 0);
			} else {
				setTimeout(function() {
					Timer.end();
					Timer.penalty();
				}, 0);
			}
			Game.levelUp();
		},

		showQuestion: function() {
			Game.status = "pausedForQuestion";
			Question.show();
		},

		firstLevel: function() {
			var yPos = -(bgImage.clientHeight - Terrain.step);
			Terrain.position = yPos;
			var path = Bike.paths[Game.platform][Game.level];
			Bike.turn(path.displacement, path.direction, path.delay);
			Game.level++;
			TweenMax.to(bgImage, 3, {
				ease: Terrain.easeAnimation,
				css: { transform: "translate(0px, " + yPos + "px)" },
				onComplete: function() {
					Game.showQuestion();
				}
			});
		},

		levelUp: function() {
			if (Game.level === 11) {
				return false;
			}
			var yPos = (Terrain.position = -(
				Math.abs(Terrain.position) - Terrain.step
			));
			var path = Bike.paths[Game.platform][Game.level];
			if (path.direction !== "normal") {
				Bike.turn(path.displacement, path.direction, path.delay);
			}
			if (Game.level === 10) {
				TweenMax.to(bgImage, 4, {
					ease: Terrain.easeAnimation,
					css: { transform: "translate(0px, " + yPos + "px)" },
					onComplete: Game.complete,
					onStart: Bike.moveToFinish
				});
			} else {
				TweenMax.to(bgImage, 4, {
					ease: Terrain.easeAnimation,
					css: { transform: "translate(0px, " + yPos + "px)" },
					onComplete: function() {
						Game.showQuestion();
					}
				});
			}
			Game.level++;
		},

		reset: function() {
			console.log("resetting");
			Terrain.render();
		},

		selectRider: function(riderName) {
			Bike.selectedRider = riderName === "CS Santosh" ? 1 : 0;
			Bike.render();
		},

		updateAnswer: function(answer) {
			console.log(Game.level - 1, Game.userData.userId, Util.formatTime(stopwatch.time()), Game.checkpoints, answer);
			var formData = new FormData();
			formData.set("userId", Game.userData.userId);
			formData.set("time", Util.formatTime(stopwatch.time()));
			formData.set("Checkpoints", Game.checkpoints);
			formData.set("question", Game.level - 1);
			formData.set("answer", answer);

			Data.post("/update-answer", formData).then(
				function(response) {
					console.log(response);
					if (response !== "success") {
						/** TODO: Handle submit error */
					} else {
						//Popup.show();
					}
				},
				function(error) {
					Game.error.updateAnswer.push([Game.level, answer]);
					/** TODO: Handle submit error */
				}
			);
		},

		complete: function() {
			var formData = new FormData();
			formData.set("userId", Game.userData.userId);
			formData.set("time", Timer.getTime());
			formData.set("Checkpoints", Game.checkpoints);

			Data.post("/getscoredetails", formData).then(
				function(response) {
					if (response !== "success") {
						/** TODO: Handle submit error */
					} else {
						Popup.show();
					}
				},
				function(error) {
					Game.error.submit = true;
					/** TODO: Handle submit error */
				}
			);
		}
	};

	var Data = {
		endpoint: "http://14.141.44.165/merzouga-2018/api",

		fetch: function(url) {
			return new Promise(function(resolve, reject) {
				var xmlhttp = new XMLHttpRequest();

				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == XMLHttpRequest.DONE) {
						if (xmlhttp.status == 200) {
							try {
								var response = JSON.parse(xmlhttp.responseText);
								resolve(response);
							} catch (err) {
								reject();
							}
						} else if (xmlhttp.status == 400) {
							reject();
						} else {
							reject();
						}
					}
				};

				xmlhttp.open("GET", Data.endpoint + url, true);
				xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
				xmlhttp.setRequestHeader(
					"Access-Control-Allow-Credentials",
					"true"
				);
				xmlhttp.setRequestHeader(
					"authToken",
					"Basic SGVyb21vdG9zcG9ydHM6SE1TQDIwMTgh"
				);
				xmlhttp.send();
			});
		},

		post: function(url, data) {
			return new Promise(function(resolve, reject) {
				var xmlhttp = new XMLHttpRequest();

				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
						resolve(xmlhttp.responseText);
					}
				};

				xmlhttp.open("POST", Data.endpoint + url, true);
				xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
				xmlhttp.setRequestHeader(
					"Access-Control-Allow-Credentials",
					"true"
				);
				xmlhttp.setRequestHeader(
					"authToken",
					"Basic SGVyb21vdG9zcG9ydHM6SE1TQDIwMTgh"
				);
				xmlhttp.send(data);
			});
		}
	};

	var Question = {
		currentQuestion: "",

		questionNumberContainer: document.querySelector(".popup-header-wrap"),

		questionContainer: document.querySelector(".question-copy"),

		optionsContainers: {
			a: document.querySelector(".question-options.a"),
			b: document.querySelector(".question-options.b")
		},

		show: function() {
			var question = (Question.currentQuestion =
				Game.questions[Game.level - 1]);
			Question.questionNumberContainer.innerHTML =
				"Question " + Game.level;
			Question.questionContainer.innerHTML = question.question;
			Question.optionsContainers.a.innerHTML = question.optionA;
			Question.optionsContainers.b.innerHTML = question.optionB;
			new TimelineLite()
				.to(".question-popup", 0.5, {
					autoAlpha: 1,
					y: "0%",
					opacity: 1,
					display: "block",
					zIndex: 2
				})
				.from(".question-content-wrap", 0.4, { opacity: 0 })
				.from(".question-content-wrap-bg", 0.5, {
					height: 0,
					opacity: 0,
					onComplete: Timer.start
				})
				.from(".question-copy", 0.3, { opacity: 0 })
				.staggerFrom(
					".question-options",
					0.3,
					{ opacity: 0, scale: 0.8, ease: Bounce.easeOut },
					0.2
				);
		},

		listeners: function() {
			document
				.querySelectorAll(".question-options")
				.forEach(function(element, index) {
					element.addEventListener("click", function(e) {
						var option = e.target.classList[1]; // the second class name is the option selected
						var answer = Question.checkAnswer(option);
						Game.status = "running";
						Timer.stop();
						Question.hide();
						if (!answer) {
							Timer.addPenalty();
						} else {
							Game.checkpoints++;
							document.querySelector(
								".question-indicator"
							).textContent =
								"Checkpoint " + Game.checkpoints + "/10";
						}
						Game.levelUp();
						Game.updateAnswer(e.target.textContent);
					});
				});
		},

		hide: function() {
			new TimelineLite()
				.to(".question-popup", 0.3, {
					autoAlpha: 0,
					y: "0%",
					opacity: 0,
					display: "none",
					zIndex: 0
				})
				.from(".question-content-wrap", 0.3, { opacity: 1 })
				.from(".question-content-wrap-bg", 0.3, { opacity: 1 })
				.from(".question-copy", 0.2, { opacity: 1 })
				.staggerFrom(
					".question-options",
					0.2,
					{ opacity: 1, scale: 0.8, ease: Bounce.easeOut },
					0.2
				);
		},

		checkAnswer: function(option) {
			var answer =
				Game.userData.riderName === Question.currentQuestion.riderName
					? "a"
					: "b";
			return option === answer;
		}
	};

	var Popup = {
		container: document.querySelector(".popup-wrap"),

		show: function() {
			Popup.container.querySelector(".text-copy").textContent =
				"I've completed the HeroMotoSports #Merzouga2018 Challenge in " +
				Timer.getTime() +
				"! Can you beat my record? Take the challenge now.";
			TweenMax.to(Popup.container, 0.5, {
				autoAlpha: 1,
				display: "block",
				delay: 0.5
			});
		},

		hide: function() {
			TweenMax.to(Popup.container, 0.5, {
				autoAlpha: 0,
				display: "none",
				delay: 0.5
			});
		}
	};

	bgImage.onload = function() {
		Game.background = true;
		Terrain.render();
	};
	bgImage.onerror = function() {
		Game.error.terrain = true;
	};
	bgImage.src = Util.getBackgroundImage();
	bgImage.className = "terrain";

	bikeAtlas.onload = function() {
		Game.bike = true;
	};
	bikeAtlas.onerror = function() {
		Game.error.bike = true;
	};
	bikeAtlas.className = "bike";
	bikeAtlas.src = Bike.image;

	Game.loading();
	Game.fetchQuestions();
	Question.listeners();

	window.Game = Game;
	window.Popup = Popup;
	window.Bike = Bike;
})();
