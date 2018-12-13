function AllowMutateEsmExportsPlugin() {}

AllowMutateEsmExportsPlugin.prototype.apply = function(compiler) {
  compiler.hooks.compilation.tap('AllowMutateEsmExportsPlugin', function(compilation) {
    compilation.mainTemplate.hooks.requireExtensions.tap('AllowMutateEsmExportsPlugin', source => {
      return source.replace(
        'exports, name, { enumerable: true, get: getter }',
        'exports, name, { enumerable: true, writable:true, value: getter()}'
      );
    });
  });
};

module.exports = AllowMutateEsmExportsPlugin;
