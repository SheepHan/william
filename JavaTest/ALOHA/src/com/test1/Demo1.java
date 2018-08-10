package com.test1;

abstract class MyShape{
	public abstract void getArea();
	public abstract void getLength();	
}

class Circle extends MyShape{
	public static final double PI = 3.14;
	double r;
	public Circle(double r){
		this.r =r ;	
	}
	public  void getArea(){
		System.out.println("Բ�ε������"+ PI*r*r);
	}
	public  void getLength(){
		System.out.println("Բ�ε��ܳ���"+ 2*PI*r);
	}
}


class Rect  extends MyShape{
	int width;
	int height;
	public Rect(int width , int height){
		this.width = width;
		this.height = height;
	}
	public  void getArea(){
		System.out.println("���ε������"+ width*height);
	}
	public  void getLength(){
		System.out.println("���ε��ܳ���"+ 2*(width+height));
	}
}
	
 class Demo1 {
	public static void main(String[] args) {

		Circle c = new Circle(4.0);
		print(c);
		
		Rect r = new Rect(3,4);
		print(r);
	}
	public static void print(MyShape s){ //һ��������������ͱ���ָ����������󣬶�̬��ʹ��
			s.getArea();
			s.getLength();
		}	
}


