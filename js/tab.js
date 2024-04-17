var ContactTab = function() {
    var panel = new EmptyPanel();
    
    var title = new Label('CONTACT US', 'dark-secondary', 'title', 'block').setStyle({
        textAlign: 'center'
    });

    var content = new Panel().setStyle({
        padding: '10px',
        minHeight: '70vh'
    });

    
    content.add(title);

    var grid = new Grid(8);

    grid
    .cell(new Panel()
        .add(
            new Label('PHONE', 'dark', 'menu', 'block').setStyle({textAlign: 'center'})
        )
        .add(
            new Label('+63-963-6382-382', 'dark-secondary', 'caption', 'block').setStyle({textAlign: 'center'})
        )
        .add(new Divider().setStyle({marginTop: '20px', marginBottom: '20px'}))
        .add(
            new Label('EMAIL', 'dark', 'menu', 'block').setStyle({textAlign: 'center'})
        )
        .add(
            new Label('GMAIL: marjoncajocon08@gmail.com', 'dark-secondary', 'caption', 'block').setStyle({textAlign: 'center'})
        )
        .add(
            new Label('YAHOO: marjoncajocon@myyahoo.com', 'dark-secondary', 'caption', 'block').setStyle({textAlign: 'center'})
        )
        , ['md-6'])
    .cell(new EmptyPanel(), ['md-6']);

    content.add(grid);
    panel.add(content);


    

    this.control = function() {
        return  panel.control();
    };
};