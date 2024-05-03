class Hello {
    public static void main(String[] args) {
        System.out.println("Hello Java!"); // Display the string.
    }

    public static int testAnswer(Question6 question, String s,
            int expectedAnswer) {
        double actual = question.answer(s);
        if (Math.abs(actual - expectedAnswer) < 1) {
            return 1;
        } else {
            return 0;
        }
    }

}
