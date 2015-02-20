support.factories = {
  entry: function(attributes) {
    var entry = new Backbone.Model(attributes);

    entry.chapters = new pageflow.ChaptersCollection();
    entry.pages = new pageflow.PagesCollection();

    return entry;
  },

  chapter: function(entry, attributes) {
    attributes = attributes || {};
    var chapter = new Backbone.Model(_(attributes).omit('configuration'));

    chapter.configuration = new Backbone.Model(attributes.configuration);
    chapter.pages = new pageflow.ChapterPagesCollection({
      pages: entry.pages,
      chapter: chapter
    });

    entry.chapters.add(chapter);

    return chapter;
  },

  page: function(chapter, attributes) {
    attributes = attributes || {};
    var page = new Backbone.Model(_(attributes).omit('configuration'));

    page.configuration = new Backbone.Model(attributes.configuration);
    page.pageLinks = function() {
      return support.factories.pageLinks();
    };

    chapter.pages.add(page);

    return page;
  },

  pageLinks: function() {
    var pageLinks = new Backbone.Collection();

    pageLinks.canAddLink = function() {
      return false;
    };

    return pageLinks;
  }
};