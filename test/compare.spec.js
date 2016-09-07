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

    it('should align ObjectExpression with object rest spread transform operator', function() {
      var output = esformatter.format(getFile('13.in'), {});
      expect(output).to.be.eql(getFile('13.out'));
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
  });
});

function getFile(name) {
  return fs.readFileSync('test/compare/' + name).toString();
}
