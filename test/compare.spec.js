var esformatter = require('esformatter');
var fs          = require('fs');
var align       = require('../');
var expect      = require('chai').expect;

describe('compare input/output', function() {

  before(function() {
    esformatter.register(align);
  });

  describe('align', function() {

    it('should align VariableDeclaration', function() {
      var output = esformatter.format(getFile('1.in'), {});
      expect(output).to.be.eql(getFile('1.out'));
    });

    it('should not align VariableDeclaration with for loop', function() {
      var output = esformatter.format(getFile('1.in'), {});
      expect(output).to.be.eql(getFile('1.out'));
    });

    it('should align ObjectExpression', function() {
      var output = esformatter.format(getFile('3.in'), {});
      expect(output).to.be.eql(getFile('3.out'));
    });

    it('should align only consecutive lines', function() {
      var output = esformatter.format(getFile('4.in'), {});
      expect(output).to.be.eql(getFile('4.out'));

      var output = esformatter.format(getFile('5.in'), {});
      expect(output).to.be.eql(getFile('5.out'));
    });

    it('should work with not assigned declaration', function() {
      var output = esformatter.format(getFile('6.in'), {});
      expect(output).to.be.eql(getFile('6.out'));
    });

    it('should align var, let and const', function() {
      var output = esformatter.format(getFile('7.in'), {});
      expect(output).to.be.eql(getFile('7.out'));
    });

    it('should align var with multiple variables', function() {
      var output = esformatter.format(getFile('8.in'), {});
      expect(output).to.be.eql(getFile('8.out'));
    });

    it('should also remove whitespace to align', function() {
      var output = esformatter.format(getFile('9.in'), {});
      expect(output).to.be.eql(getFile('9.out'));
    });

    it('should align AssignmentExpression', function() {
      var output = esformatter.format(getFile('10.in'), {});
      expect(output).to.be.eql(getFile('10.out'));
    });

    it('should align TernaryConditionalExpression', function() {
      var output = esformatter.format(getFile('11.in'), {
        align: {
            TernaryExpression: 1
        }
      });
      expect(output).to.be.eql(getFile('11.out'));
    });

    it('should align LogicalOrExpression', function() {
      var output = esformatter.format(getFile('12.in'), {
        align: {
            OrExpression: 1
        }
      });
      expect(output).to.be.eql(getFile('12.out'));
    });

    it('should align object rest spread transform on the key side by default', function() {
      var output = esformatter.format(getFile('13.in'), {});
      expect(output).to.be.eql(getFile('13.out'));
    });

    it('should align object rest spread transform on the value side when specified in options', function() {
      var output = esformatter.format(getFile('14.in'), {
        align: {
          SpreadAlignment: 'value'
        }
      });
      expect(output).to.be.eql(getFile('14.out'));
    });

    it('should align shorthand property on the key side by default', function() {
      var output = esformatter.format(getFile('15.in'), {});
      expect(output).to.be.eql(getFile('15.out'));
    });

    it('should align shorthand property on the key side when specified in options', function() {
      var output = esformatter.format(getFile('16.in'), {
        align: {
          ShorthandAlignment: 'value'
        }
      });
      expect(output).to.be.eql(getFile('16.out'));
    });
  });
});

function getFile(name) {
  return fs.readFileSync('test/compare/' + name).toString();
}
