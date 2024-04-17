var HomeSider = function() {
    var panel = new EmptyPanel().setStyle({
        width: '100%',
        height: '100vh',
        boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
        position: 'relative'
    });

    var content = new EmptyPanel().setStyle({
        padding: '10px',
        position: 'relative'   
    });


    var pic = new EmptyPanel().setStyle({
        width: '290px',
        height: '290px',
        borderRadius: '50%',
        boxShadow: '0 0 3px rgba(0, 0, 0, 0.4)',
        margin: 'auto'
    }).setImage('images/me.jpg');
    

    var info = new Panel().setStyle({marginTop: '10px'});

    info.add(new Label('MARJON M. CAJOCON', 'dark', 'title', 'block').setStyle({textAlign: 'center'}));
    info.add(new Label('SOFTWARE ENGINEER', 'dark-secondary', 'caption', 'block').setStyle({textAlign: 'center'}));


    var info2 = new Panel().setStyle({marginTop: '2px'});
    info2.add(new Label('LANGUAGE', 'dark', 'menu', 'block').setStyle({textAlign: 'center'}));
    
    info2.add(new Label('Primary:  Python & JavaScript + (HTML & CSS)', 'dark-secondary', 'caption', 'block').setStyle({textAlign: 'center'}));
    info2.add(new Label('Secondary:  C, C++, C#, VB.NET, Java, Cython, PHP', 'dark-secondary', 'caption', 'block').setStyle({textAlign: 'center'}));
    
    content.add(pic);
    content.add(info);
    content.add(info2);
    panel.add(content);
    return panel;
};

var HomeContent = function() {
    var panel = new EmptyPanel().setStyle({
        height: '100vh',
        backgroundColor: ''
    });


    var tab = new Tab('home', 'justified');
    tab.add('Profile', new EmptyPanel(), function(e) {
        e.clear().add(new ProfileTab());
    })
    .add('Gallery', new EmptyPanel(), function() {

    })
    .add('Projects', new EmptyPanel(), function() {

    })
    .add('About', new EmptyPanel(), function() {

    });



    var stab = new EmptyPanel().setStyle({
        boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
        height: '100vh'
    })
    .add(tab);

    panel.add(stab);

    return panel;
};


var HomeCover = function() {
  
    var main_cover = new ImageSlider()
            .add('images/cover.jpg')
            .add('images/s1.jpg')
            .add('images/s2.jpg')
            .update()
            .start(20);

    window.addEventListener('resize', function() {
        main_cover.stop().update().start(20);        
    });

    return main_cover;
};

var HomeView = function() {


    var panel = new Container()
    .add(new Grid(0).cell(
        HomeCover(), ['md-12']
    ))
    .add(
        new Grid(5)
        .cell(HomeSider(), ['md-5', 'lg-4', 'xl-3'])
        .cell(HomeContent(), ['md-7', 'lg-8', 'xl-9'])
    );
    return panel;
};