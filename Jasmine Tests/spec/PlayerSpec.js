describe('Settings', function () {
  var Sett = Settings;

  it('have map control info', function () {
    expect(Sett.control).toBe(true);
  });

  it('have map style info > 0', function () {
    expect(Sett.stylesTab.length).toBeGreaterThan(0);
  });

  it('have pins style info > 0', function () {
    expect(Sett.pinsTab.length).toBeGreaterThan(0);
  });

  it("test repleace letter for UTF8 sign | KRAKÓW", function () {
    toSearch = "kraków";
    expect(repleacePolishLetters(toSearch)).toBe('krak%C3%B3w');
  });

  it("test repleace letter for UTF8 sign 2 | ELBLĄG", function () {
    toSearch = "elbląg";
    expect(repleacePolishLetters(toSearch)).toBe('elbl%C4%85 g');
  });

  it("test repleace letter for UTF8 sign 2 | MĘCIKAŁ", function () {
    toSearch = "męcikał";
    expect(repleacePolishLetters(toSearch)).toBe('m%C4%99cika%C5%82');
  });


  it("test repleace letter for UTF8 sign 2 | ą, ć, ś, ó, ł, ę", function () {
    toSearch = "ą, ć, ś, ó, ł, ę";
    expect(repleacePolishLetters(toSearch)).toBe('%C4%85 ,%20%C4%87 ,%20%C5%9B,%20%C3%B3,%20%C5%82,%20%C4%99');
  });

  it("get Cookie/ set cookie test", function () {
    setCookie("mapStyle", "multiMapStyle", 1000, 2, 2, 1);
    var name = "mapStyle";
    expect(getCookie(name)).toBe('multiMapStyle')
  });
  
  it("get Cookie/ set cookie test 2 ", function () {
    setCookie("mapStyle", "lightMapStyle", 1000, 2, 2, 1);
    var name = "mapStyle";
    expect(getCookie(name)).toBe('lightMapStyle')
  });

  it("get Cookie/ set cookie test 3 ", function () {
    setCookie("mapStyle", "assinMapStyle", 1000, 2, 2, 1);
    var name = "mapStyle";
    expect(getCookie(name)).toBe('assinMapStyle')
  });

});
