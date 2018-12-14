function AllowMutateEsmExportsPlugin() {
}

AllowMutateEsmExportsPlugin.prototype.apply = function(compiler) {
  compiler.hooks.compilation.tap('AllowMutateEsmExportsPlugin', function(compilation) {
    compilation.mainTemplate.hooks.requireExtensions.tap('AllowMutateEsmExportsPlugin', source => {
      return source.replace(
        'exports, name, { enumerable: true, get: getter }',
        'exports, name, { enumerable: true, get: function(){return this["_"+name] === undefined ? getter(): this["_"+name]}, set:function(val) {this["_"+name] = val}}'
      );
    });
  });
};

module.exports = AllowMutateEsmExportsPlugin;
