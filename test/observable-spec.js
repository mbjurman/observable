(function() {

	require(["observable"], function(sut) {

		describe("makeObservable ", function() {
			var obj;

			beforeEach(function() {
				obj = {};
			});

			it("adds publish to obj", function() {
				sut.makeObservable(obj);

				expect(typeof(obj.visitSubscribers)).toBe(typeof(Function));
			});

			it("adds subscribe to obj", function() {
				sut.makeObservable(obj);

				expect(typeof(obj.visitSubscribers)).toBe(typeof(Function));
			});

			it("adds unsubscribe to obj", function() {
				sut.makeObservable(obj);

				expect(typeof(obj.visitSubscribers)).toBe(typeof(Function));
			});

			it("adds subscribers object", function() {
				sut.makeObservable(obj);

				expect(typeof(obj.subscribers)).toBe("object");
				expect(obj.subscribers.length).toBe(0);
			});
		});	

		describe("for observed objects", function() {
			describe("subscribe", function() {
				it("adds observers to array", function() {
					var observerA = "a",
						observerB = "b",
						obj = {};
					sut.makeObservable(obj);
					
					obj.subscribe("c", observerA);
					obj.subscribe("c", observerB);

					expect(obj.subscribers.hasOwnProperty("c")).toBe(true);
					expect(obj.subscribers.c.length).toBe(2);
					expect(obj.subscribers.c[0]).toBe("a");
					expect(obj.subscribers.c[1]).toBe("b");
				});
			});

			describe("unsubscribe", function() {
				it("removes observers from array", function() {
					var observerA = "a",
						observerB = "b",
						obj = {};
					sut.makeObservable(obj);
					obj.subscribe("c", observerA);
					obj.subscribe("c", observerB);

					obj.unsubscribe("c", observerB);

					expect(obj.subscribers.c.length).toBe(1);
					expect(obj.subscribers.c[0]).toBe("a");
				});
			});

			describe("publish", function() {
				it("informs subscribers", function() {
					var observerA = jasmine.createSpy(),
						observerB = jasmine.createSpy(),
						obj = {};
					sut.makeObservable(obj);
					obj.subscribe("a", observerA);
					obj.subscribe("a", observerB);

					obj.publish("a", "b")

					expect(observerA).toHaveBeenCalledWith("b");
					expect(observerB).toHaveBeenCalledWith("b");
				});

				it("is not global", function() {
					var observerA = jasmine.createSpy(),
						observerB = jasmine.createSpy(),
						objA = {},
						objB = {};
					sut.makeObservable(objA);
					sut.makeObservable(objB);
					objA.subscribe("c", observerA);
					objB.subscribe("c", observerB);

					objA.publish("c");

					expect(observerA).toHaveBeenCalled();
					expect(observerB).not.toHaveBeenCalled();
				});				
			});
		});
	});
})();
