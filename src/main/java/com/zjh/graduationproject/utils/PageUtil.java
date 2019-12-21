package com.zjh.graduationproject.utils;

/**
 * @author zjh
 * @date 2019/11/26
 */
public class PageUtil {

    private boolean lastPage;

    private boolean nextPage;

    private int pageNumber;

    private boolean first;

    private boolean end;

    private int pageNow;

    public int getPageNow() {
        return pageNow;
    }

    public PageUtil setPageNow(int pageNow) {
        this.pageNow = pageNow;
        return this;
    }

    public boolean isFirst() {
        return first;
    }

    public PageUtil setFirst(boolean first) {
        this.first = first;
        return this;
    }

    public boolean isEnd() {
        return end;
    }

    public PageUtil setEnd(boolean end) {
        this.end = end;
        return this;
    }

    public boolean isLastPage() {
        return lastPage;
    }

    public PageUtil setLastPage(boolean lastPage) {
        this.lastPage = lastPage;
        return this;
    }

    public boolean isNextPage() {
        return nextPage;
    }

    public PageUtil setNextPage(boolean nextPage) {
        this.nextPage = nextPage;
        return this;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public PageUtil setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
        return this;
    }
}
