function AllowMutateEsmExportsPlugin() {}

AllowMutateEsmExportsPlugin.prototype.apply = function(compiler) {
  compiler.hooks.compilation.tap('AllowMutateEsmExportsPlugin', function(compilation) {
    compilation.mainTemplate.hooks.requireExtensions.tap('AllowMutateEsmExportsPlugin', source => {
      return source.replace(
        'exports, name, { enumerable: true, get: getter }',
        'exports, name, { enumerable: true, get: function(){return this._val === undefined ? getter(): this._val}, set: function(val){this._val = val}}'
      );
    });
  });
};

module.exports = AllowMutateEsmExportsPlugin;
