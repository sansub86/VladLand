var pluginName = "jqueryAccordionMenu";
var defaults = {
    speed: 300,
    showDelay: 0,
    hideDelay: 0,
    singleOpen: true,
    clickEffect: true
};
function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({},
        defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init()
};
$.extend(Plugin.prototype, {
    init: function() {
        this.openSubmenu();
        this.submenuIndicators();
        if (defaults.clickEffect) {
            this.addClickEffect()
        }
    },
    openSubmenu: function() {
        $(this.element).children("ul").find("li").bind("click touchstart",
            function(e) {
                e.stopPropagation();
                e.preventDefault();
                if ($(this).children(".submenu").length > 0) {
                    if ($(this).children(".submenu").css("display") == "none") {
                        $(this).children(".submenu").delay(defaults.showDelay).slideDown(defaults.speed);
                        $(this).children(".submenu").siblings("a").addClass("submenu-indicator-minus");
                        $(this).children(".submenu").siblings("a").addClass("accordeon_item_selected");
                        if (defaults.singleOpen) {
                            $(this).siblings().children(".submenu").slideUp(defaults.speed);
                            $(this).siblings().children(".submenu").siblings("a").removeClass("submenu-indicator-minus");
                        }
                        return false
                    } else {
                        $(this).children(".submenu").delay(defaults.hideDelay).slideUp(defaults.speed)
                    }
                    if ($(this).children(".submenu").siblings("a").hasClass("submenu-indicator-minus")) {
                        $(this).children(".submenu").siblings("a").removeClass("submenu-indicator-minus");
                        $(this).children(".submenu").siblings("a").removeClass("accordeon_item_selected")
                    }
                }
                window.location.href = $(this).children("a").attr("href")
            })

    },
    submenuIndicators: function() {
        if ($(this.element).find(".submenu").length > 0) {
            $(this.element).find(".submenu").siblings("a").append("<span class='submenu-indicator'>&#xf105;</span>")
        }
    },
    addClickEffect: function() {
        var ink, d, x, y;
        $(this.element).find("a").bind("click touchstart",
            function(e) {
                $(".ink").remove();
                if ($(this).children(".ink").length === 0) {
                    $(this).prepend("<span class='ink'></span>")
                }
                ink = $(this).find(".ink");
                ink.removeClass("animate-ink");
                if (!ink.height() && !ink.width()) {
                    d = Math.max($(this).outerWidth(), $(this).outerHeight());
                    ink.css({
                        height: d,
                        width: d
                    })
                }
                x = e.pageX - $(this).offset().left - ink.width() / 2;
                y = e.pageY - $(this).offset().top - ink.height() / 2;
                ink.css({
                    top: y + 'px',
                    left: x + 'px'
                }).addClass("animate-ink")
            })
    }
});
$.fn[pluginName] = function(options) {
    this.each(function() {
        if (!$.data(this, "plugin_" + pluginName)) {
            $.data(this, "plugin_" + pluginName, new Plugin(this, options))
        }
    });
    return this
};
//обработчик
jQuery(document).ready(function () {
    jQuery("#jquery-accordion-menu").jqueryAccordionMenu();
});
//активный класс
$(function(){
    $("#demo-list li").click(function(){
        $("#demo-list li.active").removeClass("active");
        $(this).addClass("active");
    })
});
function catalogClick() {
    if($(".content").css("display") === "none"){
        $(".content").css("display","block");
        $(".catalog_icon__btn > .span").css({"transform":"rotate(45deg)", "top":"0"});
        $(".catalog_icon__btn > .span_before").css({"transform":"rotate(45deg)", "top":"0"});
        $(".catalog_icon__btn > .span_after").css({"transform":"rotate(-45deg)", "top":"0"});
    } else {
        $(".content").css("display","none");
        $(".catalog_icon__btn > .span").css({"transform":"rotate(0)", "top":"0"});
        $(".catalog_icon__btn > .span_before").css({"transform":"rotate(0)", "top":"-9px"});
        $(".catalog_icon__btn > .span_after").css({"transform":"rotate(0)", "top":"9px"});
    }
}
function catalogHover() {
    $(".content").css("display","block");
}
function dropdownMenu() {
    if(document.documentElement.clientWidth >= 768) {
        $(".catalog").hover(catalogHover);
        /*        $("#jquery-accordion-menu").hover(null, function () {
                    $(".content").css("display","none");
                });*/
        $(".catalog").click(null);
        if($(".catalog").css("display") === "block"){
            $(".catalog").css("display","none");
        }

    }else {
        $(".map > ymaps").css("width", "100%");
        $(".catalog").unbind();
        $("#jquery-accordion-menu").unbind();
        if($(".content").css("display") === "block"){
            $(".content").css("display","none");
        }
        $(".catalog").click(catalogClick);
    }
}
dropdownMenu();
$(window).resize(function () {
    if(document.documentElement.clientWidth >= 768){
        $(".catalog").hover(catalogHover);
    }else {
        $(".map > ymaps").css("width", "100%");
        $(".catalog").unbind();
        $("#jquery-accordion-menu").unbind();
        if($(".content").css("display") === "block"){
            $(".content").css("display","none");
        }
        $(".catalog").click(catalogClick);
    }
});
