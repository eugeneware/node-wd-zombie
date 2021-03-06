fs = require "fs"
async = require "async"

disabledTests = 
  'per-method-test': [
    'waitForElement'
    'waitForVisible'
    'getComputedCss'
    'takeScreenshot'
    'isVisible'
    'getLocation'
    'getSize'
    'err.inspect'
  ]
  'element-test':[
    'element.getTagName'
    'element.isDisplayed'
    'element.getComputedCss'
    'element.getValue'
    'element.element'
  ]
  'window-frame-test':[
    '.*'
  ]
module.exports = (sourceDir, targetDir, filename , done) ->
  fileKey = filename.replace '-base.js', ''
  orig = null
  target = null
  async.series [
    (done) ->
      fs.readFile "#{sourceDir}/#{filename}", (err, data) ->         
        orig = data.toString() unless err
        done err
    (done) ->
      fs.open "#{targetDir}/#{filename}", 'a', (err, fd) ->
        target = fd unless err
        done err
    (done) ->
      disabledTestsForFile = disabledTests[fileKey] or []
      async.forEachSeries orig.split('\n'), (line, done) ->                
        async.forEachSeries disabledTestsForFile, (d, done) ->
          rx = new RegExp "describe\\\(\"#{d}.*"
          if line.match rx
            line = line.replace "describe(\"", "describe(\"<DISABLED>"
          rx = new RegExp "describe\\\(#{d}.*"
          if line.match rx
            line = line.replace "describe(", "describe(\"<DISABLED>\" + "
          done null
        , (err) ->
          unless err?
            fs.write target, "#{line}\n", undefined, undefined, done
          else done err          
      , done
    (done) -> fs.close target, done            
  ], done
