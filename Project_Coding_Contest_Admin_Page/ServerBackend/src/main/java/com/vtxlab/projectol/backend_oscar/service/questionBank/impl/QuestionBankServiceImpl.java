package com.vtxlab.projectol.backend_oscar.service.questionBank.impl;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vtxlab.projectol.backend_oscar.entity.questionBank.QuestionBank;
import com.vtxlab.projectol.backend_oscar.payload.response.question.QuestionResponse;
import com.vtxlab.projectol.backend_oscar.repository.questionBank.QuestionBankRepository;
import com.vtxlab.projectol.backend_oscar.service.questionBank.QuestionBankService;

@Service
public class QuestionBankServiceImpl implements QuestionBankService {

  @Autowired
  private QuestionBankRepository questionRepository;

  @Override
  public QuestionResponse generateQuestionBank(Long questionId) {

    Optional<QuestionBank> questionBank =
        questionRepository.findById(questionId);
    if (!questionBank.isPresent()) {
      return null;
    }
    return QuestionResponse.builder()//
        .questionId(questionBank.get().getQuestionId())//
        .code(questionBank.get().getMethodSignatures()
            + this.generateOpenCodeBlock() + this.generateEndCodeBlock()
            + this.generateEndCodeBlock())//
        .build();
  }
  // public static final String TEST_ANSWER =
  // "public static int testAnswer(Question%s question ," ;

  // public static final String TEST_ANSWER2 =
  // "double actualAnswer = question.answer(incomeBrackets, income); \n" + //
  // "\t\t\t if (Math.abs(actualTax - expectedTax) < 0.00001) {return 1;} else {return 0; \n" + //
  // "\t\t\t\t } }\";
  // "
  @Override
  public String getTestAnswer(Long questionId) {
    return questionRepository.getTestAnswer(questionId);
  }
  // String testCaseMethodSignature = questionRepository.getMethodSignatures(questionId);
  // String inputParam = "";
  // for(int i = 0 ; i < testCaseMethodSignature.length() ; i ++){
  // int start = testCaseMethodSignature.indexOf("(");
  // int end = testCaseMethodSignature.indexOf(")");
  // inputParam = testCaseMethodSignature.substring(start + 1, end);
  // }
  // return String.format(TEST_ANSWER, questionId) + inputParam + ") { \n" +

  // }

  @Override
  public String getMethodSignatures(Long questionId) {
    return questionRepository.getMethodSignatures(questionId);
  }

  @Override
  public boolean save(QuestionBank questionBank) {
    questionRepository.save(questionBank);
    return true;
  }

  public String generateOpenCodeBlock() {
    return "{";
  }

  public String generateEndCodeBlock() {
    return "}";
  }
}
