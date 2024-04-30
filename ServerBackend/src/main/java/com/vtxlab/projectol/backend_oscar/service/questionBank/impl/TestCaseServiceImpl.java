package com.vtxlab.projectol.backend_oscar.service.questionBank.impl;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vtxlab.projectol.backend_oscar.payload.response.question.TestCaseDTO;
import com.vtxlab.projectol.backend_oscar.service.questionBank.QuestionBankService;
import com.vtxlab.projectol.backend_oscar.service.questionBank.TestCaseService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TestCaseServiceImpl implements TestCaseService {

  @Autowired
  private QuestionBankService questionBankService;

  public static final String CLASS_DECLARATION_TEMPLATE =
      "import java.util.*;%nimport java.math.*;%n public class Question%s";

  public static final String CODE_TEMPLATE =
      "// Enter the code Here.Your class should be named Question%s.%n";

  public static final String MAIN_METHOD_TEMPLATE =
      "public static void main(String[] args) { int counter = 0;Question%s question%s = new Question%s();";

  public static final String COUNT_RUNTIME =
      "long startTime = System.nanoTime();System.out.println(\" Test Case Result: \" + counter + \" / 10\");"
          + "long endTime = System.nanoTime();long duration = (endTime - startTime) / 1000000;"
          + "System.out.println(\"Time taken for Test Case 10: \"  + duration + \" milliseconds\");";

  public static String extractMethodName(String methodSignature) {
    // Define a regular expression pattern to match the method name
    String pattern = "\\s*(\\w+)\\s*\\(.*\\)"; // Matches "methodName(...)"

    // Create a Pattern object
    Pattern regex = Pattern.compile(pattern);

    // Create a Matcher object
    Matcher matcher = regex.matcher(methodSignature);

    // Check if the pattern matches the method signature
    if (matcher.find()) {
      // Extract and return the method name
      return matcher.group(1);
    }

    // Return null if no match is found
    return null;
  }

  @Override
  public String generateTestAnswer(List<TestCaseDTO> testCases,
      Long questionId) {
    StringBuilder testCaseBuilder = new StringBuilder();
    testCases.forEach(e -> {
      testCaseBuilder
          .append(questionBankService.getMethodSignatures(questionId))//
          .append(questionId).append(String.format(" question%s, ", questionId))
          .append(e.getInput1());

      if (e.getInput2() != null) {
        testCaseBuilder.append(", ").append(e.getInput2());
      }

      if (e.getInput3() != null) {
        testCaseBuilder.append(", ").append(e.getInput3());
      }

      testCaseBuilder.append(", ").append(e.getExpectedOutput()).append("); ");
    });

    testCaseBuilder.append(COUNT_RUNTIME).append(this.generateEndCodeBlock());
    testCaseBuilder.append(questionBankService.getTestAnswer(questionId));
    testCaseBuilder.append(this.generateEndCodeBlock());

    return testCaseBuilder.toString();
  }

  private String checkString(String input) {
    if (input.indexOf("\"") == -1) {
      return input;
    } else {
      return String.valueOf(input);
    }
  }

  @Override
  public String generateTestCase(List<TestCaseDTO> testCases, Long questionId) {
    StringBuilder testCaseBuilder = new StringBuilder();
    testCases.stream().forEach(e -> {
      testCaseBuilder
          .append(String.format("counter += question%s.testAnswer(question%s",
              questionId, questionId))
          .append(", ").append(checkString(e.getInput1()));

      if (e.getInput2() != null) {
        if (e.getInput2().equals("0")) {
          // Append "0" if input2 is "0"
          testCaseBuilder.append(",").append(0);
        } else {
          testCaseBuilder.append(", ")//
              .append(checkString(e.getInput2()));

        }
      }
      // Append input3
      if (e.getInput3() != null) {
        if (e.getInput3().equals("0")) {
          // Append "0" if input3 is "0"
          testCaseBuilder.append(",").append(0);
        } else {
          testCaseBuilder.append(", ").append(checkString(e.getInput3()));
        }
      }

      if (e.getExpectedOutput().equals("0")) {
        // Append "0" if input3 is "0"
        testCaseBuilder.append(",").append(0);
      } else {
        testCaseBuilder.append(", ").append(checkString(e.getExpectedOutput()));
      }
      log.info("expected Output" + e.getExpectedOutput());
      testCaseBuilder.append(");");

    });

    testCaseBuilder.append(COUNT_RUNTIME).append(this.generateEndCodeBlock());
    testCaseBuilder.append(questionBankService.getTestAnswer(questionId));
    testCaseBuilder.append(this.generateEndCodeBlock());
    return testCaseBuilder.toString();
  }

  // public Long questionId() {
  // return this.getQuestionBank().getQuestionId();
  // }
  @Override
  public String generateClassDeclaration(Long questionId) {
    return String.format(CLASS_DECLARATION_TEMPLATE + //
        this.generateOpenCodeBlock(), questionId);
  }

  @Override
  public String generateFullCode(Long questionId) {
    return String.format(questionBankService.getMethodSignatures(questionId) + //
        this.generateOpenCodeBlock() + //
        CODE_TEMPLATE + //
        this.generateEndCodeBlock() + "%n " + //
        this.generateEndCodeBlock(), questionId);
  }

  @Override
  public String generateMainMethod(Long questionId) {
    StringBuilder mainMethodCode = new StringBuilder();
    mainMethodCode.append(String.format(MAIN_METHOD_TEMPLATE, questionId, //
        questionId, //
        questionId//
    )) //
    ;//

    return mainMethodCode.toString();
  }

  public String generateOpenCodeBlock() {
    return "{%n";
  }

  public String generateEndCodeBlock() {
    return "}";
  }

}
